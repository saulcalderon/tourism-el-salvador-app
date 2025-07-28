import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceResponseDto } from './dto/place.response.dto';
import { PlaceIdResponseDto } from './dto/place-id.response.dto';

@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiOperation({ summary: 'Create a new place' })
  @ApiResponse({
    status: 201,
    description: 'The place has been successfully created.',
    type: PlaceIdResponseDto,
  })
  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placeService.create(createPlaceDto);
  }

  @ApiOperation({ summary: 'Get all places' })
  @ApiResponse({
    status: 200,
    description: 'The places have been successfully retrieved.',
    type: [PlaceResponseDto],
  })
  @Get()
  findAll() {
    return this.placeService.findAll();
  }

  @ApiOperation({ summary: 'Get a place by ID' })
  @ApiResponse({
    status: 200,
    description: 'The place has been successfully retrieved.',
    type: PlaceResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a like for a place' })
  @ApiResponse({
    status: 200,
    description: 'The like has been successfully created.',
    type: PlaceIdResponseDto,
  })
  @Post(':id/like')
  createLike(@Param('id') id: string) {
    return this.placeService.createLike(id);
  }

  @ApiOperation({ summary: 'Update a place' })
  @ApiResponse({
    status: 200,
    description: 'The place has been successfully updated.',
    type: PlaceResponseDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placeService.update(id, updatePlaceDto);
  }

  @ApiOperation({ summary: 'Delete a place' })
  @ApiResponse({
    status: 200,
    description: 'The place has been successfully deleted.',
    type: PlaceIdResponseDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placeService.remove(id);
  }
}
