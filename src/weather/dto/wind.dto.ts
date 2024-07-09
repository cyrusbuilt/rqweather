import { ApiProperty } from '@nestjs/swagger';

export class WindDTO {
  @ApiProperty({
    description: 'Wind speed (in requested units)',
    example: 5.75,
    type: 'float',
  })
  speed: number;

  @ApiProperty({
    description: 'Wind direction, degrees (meteorological)',
    example: 0,
    type: 'float',
  })
  degrees: number;

  @ApiProperty({
    description: 'Wind gust (in requested units)',
    example: 15.35,
    type: 'float',
    required: false,
    nullable: true,
  })
  gust?: number;

  constructor(speed: number = 0, deg: number = 0, gust?: number) {
    this.speed = speed;
    this.degrees = deg;
    this.gust = gust;
  }
}
