import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the place',
    example: 'Santa Ana Volcano',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The address of the place',
    example: 'Santa Ana, El Salvador',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the place',
    example: 'Highest volcano in El Salvador',
  })
  description: string;

  @IsUrl()
  @ApiProperty({
    description: 'The URL of the place',
    example:
      'https://elsalvador.travel/system/wp-content/uploads/2020/01/volcan-ilamatepeque-scaled.jpg',
  })
  url: string;
}
