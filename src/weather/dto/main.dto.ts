import { ApiProperty } from '@nestjs/swagger';

export class MainDTO {
  @ApiProperty({
    description: 'The temperature value in the requested units',
    example: 62.5,
    type: 'float',
  })
  temp: number;

  @ApiProperty({
    description:
      'Temperature value that accounts for human perception of weather',
    example: 60.0,
    type: 'float',
  })
  feelsLike: number;

  @ApiProperty({
    description: 'Atmospheric pressure on the sea level, hPa',
    example: 1015,
    type: 'float',
  })
  pressure: number;

  @ApiProperty({
    description: 'Humidity percentage',
    example: 64,
    type: 'integer',
  })
  humidity: number;

  @ApiProperty({
    description: 'Minimal currently observed temperature',
    example: 59.7,
    type: 'float',
  })
  tempMin: number;

  @ApiProperty({
    description: 'Maximum currently observed temperature',
    example: 63.1,
    type: 'float',
  })
  tempMax: number;

  @ApiProperty({
    description: 'Atmospheric pressure on the sea level, hPa',
    example: 1020,
    type: 'integer',
    required: false,
    nullable: true,
  })
  seaLevel?: number;

  @ApiProperty({
    description: 'Atmospheric pressure on the ground level, hPa',
    example: 1031,
    type: 'integer',
    required: false,
    nullable: true,
  })
  groundLevel?: number;

  @ApiProperty({
    description: 'Internal parameter',
    example: 1.51,
    type: 'float',
    required: false,
    nullable: true,
  })
  tempKf?: number;
}
