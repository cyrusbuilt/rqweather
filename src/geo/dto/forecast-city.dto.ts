import { ApiProperty } from '@nestjs/swagger';
import { CoordinateDTO } from 'src/geo/dto/coordinate.dto';

export class ForecastCityDTO {
  @ApiProperty({
    description: 'The city ID',
    example: 243,
    type: 'integer',
  })
  id: number;

  @ApiProperty({
    description: 'The city name',
    example: 'Alexandria',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'Geolocation coordinates of the city',
    type: CoordinateDTO,
  })
  coordinates: CoordinateDTO;

  @ApiProperty({
    description: 'Country code',
    example: 'US',
    type: 'string',
  })
  country: string;

  @ApiProperty({
    description: 'City population',
    example: 7200,
    type: 'integer',
  })
  population: number;

  @ApiProperty({
    description: 'Timezone shift in secods from UTC',
    example: -14400,
    type: 'integer',
  })
  timezone: number;

  @ApiProperty({
    description: 'Sunrise time, unix, UTC',
    example: new Date().toUTCString(),
    type: Date,
  })
  sunrise: Date;

  @ApiProperty({
    description: 'Sunset time, unix, UTC',
    example: new Date().toUTCString(),
    type: Date,
  })
  sunset: Date;
}
