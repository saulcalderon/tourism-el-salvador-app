import { Injectable, NotFoundException } from '@nestjs/common';

import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PrismaService } from '../modules/prisma/prisma.service';
import { PlaceResponseDto } from './dto/place.response.dto';
import { PlaceIdResponseDto } from './dto/place-id.response.dto';

@Injectable()
export class PlaceService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPlaceDto: CreatePlaceDto): Promise<PlaceIdResponseDto> {
    const place = await this.prismaService.place.create({
      data: {
        ...createPlaceDto,
      },
    });

    return {
      id: place.id,
    };
  }

  findAll(): Promise<PlaceResponseDto[]> {
    return this.prismaService.place.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        description: true,
        url: true,
        likesCount: true,
      },
    });
  }

  async findOne(id: string): Promise<PlaceResponseDto> {
    const place = await this.prismaService.place.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        address: true,
        description: true,
        url: true,
        likesCount: true,
      },
    });

    if (!place) {
      throw new NotFoundException(`Cannot found place with ID: ${id}`);
    }

    return place;
  }

  update(
    id: string,
    updatePlaceDto: UpdatePlaceDto,
  ): Promise<PlaceResponseDto> {
    return this.prismaService.place.update({
      data: {
        ...updatePlaceDto,
      },
      where: { id },
      select: {
        id: true,
        name: true,
        address: true,
        description: true,
        url: true,
        likesCount: true,
      },
    });
  }

  async remove(id: string): Promise<PlaceIdResponseDto> {
    await this.findOne(id);
    await this.prismaService.place.delete({
      where: { id },
    });

    return {
      id,
    };
  }

  async createLike(id: string): Promise<PlaceIdResponseDto> {
    await this.findOne(id);

    await this.prismaService.place.update({
      where: { id },
      data: { likesCount: { increment: 1 } },
    });

    return {
      id,
    };
  }
}
