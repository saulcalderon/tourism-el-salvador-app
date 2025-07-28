import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PrismaService } from '../modules/prisma/prisma.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

// Mock PrismaService
const mockPrismaService = {
  place: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('PlaceService', () => {
  let service: PlaceService;
  let prismaService: typeof mockPrismaService;

  const mockPlace = {
    id: 'test-place-id-123',
    name: 'Test Place',
    address: 'Test Address',
    description: 'Test Description',
    url: 'https://example.com/image.jpg',
    likesCount: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPlaceResponse = {
    id: mockPlace.id,
    name: mockPlace.name,
    address: mockPlace.address,
    description: mockPlace.description,
    url: mockPlace.url,
    likesCount: mockPlace.likesCount,
  };

  const mockCreatePlaceDto: CreatePlaceDto = {
    name: 'New Place',
    address: 'New Address',
    description: 'New Description',
    url: 'https://example.com/new-image.jpg',
  };

  const mockUpdatePlaceDto: UpdatePlaceDto = {
    name: 'Updated Place',
    address: 'Updated Address',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaceService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PlaceService>(PlaceService);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a place and return place ID', async () => {
      // Arrange
      prismaService.place.create.mockResolvedValue(mockPlace);

      // Act
      const result = await service.create(mockCreatePlaceDto);

      // Assert
      expect(prismaService.place.create).toHaveBeenCalledWith({
        data: mockCreatePlaceDto,
      });
      expect(result).toEqual({ id: mockPlace.id });
    });

    it('should throw an error if place creation fails', async () => {
      // Arrange
      const error = new Error('Database error');
      prismaService.place.create.mockRejectedValue(error);

      // Act & Assert
      await expect(service.create(mockCreatePlaceDto)).rejects.toThrow(error);
      expect(prismaService.place.create).toHaveBeenCalledWith({
        data: mockCreatePlaceDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all places', async () => {
      // Arrange
      const mockPlaces = [
        mockPlaceResponse,
        { ...mockPlaceResponse, id: 'place-2' },
      ];
      prismaService.place.findMany.mockResolvedValue(mockPlaces);

      // Act
      const result = await service.findAll();

      // Assert
      expect(prismaService.place.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          address: true,
          description: true,
          url: true,
          likesCount: true,
        },
      });
      expect(result).toEqual(mockPlaces);
    });

    it('should return empty array when no places exist', async () => {
      // Arrange
      prismaService.place.findMany.mockResolvedValue([]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a place when found', async () => {
      // Arrange
      const placeId = 'test-place-id';
      prismaService.place.findUnique.mockResolvedValue(mockPlaceResponse);

      // Act
      const result = await service.findOne(placeId);

      // Assert
      expect(prismaService.place.findUnique).toHaveBeenCalledWith({
        where: { id: placeId },
        select: {
          id: true,
          name: true,
          address: true,
          description: true,
          url: true,
          likesCount: true,
        },
      });
      expect(result).toEqual(mockPlaceResponse);
    });

    it('should throw NotFoundException when place is not found', async () => {
      // Arrange
      const placeId = 'non-existent-id';
      prismaService.place.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne(placeId)).rejects.toThrow(
        new NotFoundException(`Cannot found place with ID: ${placeId}`),
      );
      expect(prismaService.place.findUnique).toHaveBeenCalledWith({
        where: { id: placeId },
        select: {
          id: true,
          name: true,
          address: true,
          description: true,
          url: true,
          likesCount: true,
        },
      });
    });
  });

  describe('update', () => {
    it('should update a place and return updated place', async () => {
      // Arrange
      const placeId = 'test-place-id';
      const updatedPlace = { ...mockPlaceResponse, ...mockUpdatePlaceDto };
      prismaService.place.update.mockResolvedValue(updatedPlace);

      // Act
      const result = await service.update(placeId, mockUpdatePlaceDto);

      // Assert
      expect(prismaService.place.update).toHaveBeenCalledWith({
        data: mockUpdatePlaceDto,
        where: { id: placeId },
        select: {
          id: true,
          name: true,
          address: true,
          description: true,
          url: true,
          likesCount: true,
        },
      });
      expect(result).toEqual(updatedPlace);
    });

    it('should throw an error if update fails', async () => {
      // Arrange
      const placeId = 'test-place-id';
      const error = new Error('Update failed');
      prismaService.place.update.mockRejectedValue(error);

      // Act & Assert
      await expect(service.update(placeId, mockUpdatePlaceDto)).rejects.toThrow(
        error,
      );
    });
  });

  describe('remove', () => {
    it('should remove a place and return place ID', async () => {
      // Arrange
      const placeId = 'test-place-id';
      prismaService.place.findUnique.mockResolvedValue(mockPlaceResponse);
      prismaService.place.delete.mockResolvedValue(mockPlace);

      // Act
      const result = await service.remove(placeId);

      // Assert
      expect(prismaService.place.findUnique).toHaveBeenCalledWith({
        where: { id: placeId },
        select: {
          id: true,
          name: true,
          address: true,
          description: true,
          url: true,
          likesCount: true,
        },
      });
      expect(prismaService.place.delete).toHaveBeenCalledWith({
        where: { id: placeId },
      });
      expect(result).toEqual({ id: placeId });
    });

    it('should throw NotFoundException when place to remove is not found', async () => {
      // Arrange
      const placeId = 'non-existent-id';
      prismaService.place.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.remove(placeId)).rejects.toThrow(
        new NotFoundException(`Cannot found place with ID: ${placeId}`),
      );
      expect(prismaService.place.findUnique).toHaveBeenCalledWith({
        where: { id: placeId },
        select: {
          id: true,
          name: true,
          address: true,
          description: true,
          url: true,
          likesCount: true,
        },
      });
      expect(prismaService.place.delete).not.toHaveBeenCalled();
    });
  });

  describe('createLike', () => {
    it('should increment likes count and return place ID', async () => {
      // Arrange
      const placeId = 'test-place-id';
      prismaService.place.findUnique.mockResolvedValue(mockPlaceResponse);
      prismaService.place.update.mockResolvedValue({
        ...mockPlace,
        likesCount: mockPlace.likesCount + 1,
      });

      // Act
      const result = await service.createLike(placeId);

      // Assert
      expect(prismaService.place.findUnique).toHaveBeenCalledWith({
        where: { id: placeId },
        select: {
          id: true,
          name: true,
          address: true,
          description: true,
          url: true,
          likesCount: true,
        },
      });
      expect(prismaService.place.update).toHaveBeenCalledWith({
        where: { id: placeId },
        data: { likesCount: { increment: 1 } },
      });
      expect(result).toEqual({ id: placeId });
    });

    it('should throw NotFoundException when place to like is not found', async () => {
      // Arrange
      const placeId = 'non-existent-id';
      prismaService.place.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(service.createLike(placeId)).rejects.toThrow(
        new NotFoundException(`Cannot found place with ID: ${placeId}`),
      );
      expect(prismaService.place.findUnique).toHaveBeenCalledWith({
        where: { id: placeId },
        select: {
          id: true,
          name: true,
          address: true,
          description: true,
          url: true,
          likesCount: true,
        },
      });
      expect(prismaService.place.update).not.toHaveBeenCalled();
    });
  });
});
