import { ApiProperty } from '@nestjs/swagger';

export class CoordinateDTO {
  @ApiProperty({
    description: 'The latitude value of the coordinate',
    example: '10.99',
    type: 'float',
  })
  latitude: number;

  @ApiProperty({
    description: 'The longitude value of the coordinate',
    example: '44.34',
    type: 'float',
  })
  longitude: number;

  constructor(lat: number = 0, lon: number = 0) {
    this.latitude = lat;
    this.longitude = lon;
  }
}
