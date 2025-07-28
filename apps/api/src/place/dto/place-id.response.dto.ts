import { ApiProperty } from '@nestjs/swagger';

export class PlaceIdResponseDto {
  @ApiProperty({
    description: 'The ID of the place',
    example: 'cmdmpha1w0000m7yolaqxof0e',
  })
  id: string;
}
