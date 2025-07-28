import { ApiProperty } from '@nestjs/swagger';
import { PlaceIdResponseDto } from './place-id.response.dto';

export class PlaceResponseDto extends PlaceIdResponseDto {
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
