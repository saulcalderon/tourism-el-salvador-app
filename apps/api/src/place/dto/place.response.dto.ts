import { ApiProperty } from '@nestjs/swagger';

export class PlaceResponseDto {
  @ApiProperty({
    description: 'The ID of the place',
    example: 'cmdmpha1w0000m7yolaqxof0e',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the place',
    example: 'Santa Ana Volcano',
  })
  name: string;

  @ApiProperty({
    description: 'The address of the place',
    example: 'Santa Ana, El Salvador',
  })
  address: string;

  @ApiProperty({
    description: 'The description of the place',
    example: 'Highest volcano in El Salvador',
  })
  description: string;

  @ApiProperty({
    description: 'The URL of the place',
    example:
      'https://elsalvador.travel/system/wp-content/uploads/2020/01/volcan-ilamatepeque-scaled.jpg',
  })
  url: string;

  @ApiProperty({
    description: 'The number of likes of the place',
    example: 1,
  })
  likesCount: number;
}
