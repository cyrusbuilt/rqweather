import { ApiProperty } from '@nestjs/swagger';
import { CloudsDTO } from './clouds.dto';
import { CoordinateDTO } from '../../geo/dto/coordinate.dto';
import { MainDTO } from './main.dto';
import { RainDTO } from './rain.dto';
import { SnowDTO } from './snow.dto';
import { SystemDTO } from './system.dto';
import { WeatherConditionDTO } from './weather-condition.dto';
import { WindDTO } from './wind.dto';

export class WeatherResponseDTO {
  @ApiProperty({
    description: 'Geolocation data',
    type: CoordinateDTO,
  })
  coord: CoordinateDTO;

  @ApiProperty({
    description: 'Weather condition data',
    type: [WeatherConditionDTO],
  })
  weather: WeatherConditionDTO[];

  @ApiProperty({
    description: 'Internal parameter',
    example: 'stations',
    type: 'string',
  })
  base: string;

  @ApiProperty({
    description: 'Main weather detail data',
    type: MainDTO,
  })
  main: MainDTO;

  @ApiProperty({
    description: 'Visibility in meters (max is 10km)',
    example: 5000,
    type: 'integer',
  })
  visibility: number;

  @ApiProperty({
    description: 'Wind data',
    type: WindDTO,
  })
  wind: WindDTO;

  @ApiProperty({
    description: 'Clouds data',
    type: CloudsDTO,
  })
  clouds: CloudsDTO;

  @ApiProperty({
    description: 'Rainfall data',
    type: RainDTO,
    nullable: true,
    required: false,
  })
  rain?: RainDTO;

  @ApiProperty({
    description: 'Snowfall data',
    type: SnowDTO,
    nullable: true,
    required: false,
  })
  snow?: SnowDTO;

  @ApiProperty({
    description: 'Time of data calculation, unix, UTC',
    example: new Date().toUTCString(),
    type: Date,
  })
  timestamp: Date;

  @ApiProperty({
    description: 'System data',
    type: SystemDTO,
  })
  system: SystemDTO;

  @ApiProperty({
    description: 'Timezone offset shift in seconds from UTC',
    example: -14400,
    type: 'integer',
  })
  timezone: number;

  @ApiProperty({
    description: 'City ID',
    example: 4282342,
    type: 'integer',
  })
  id: number;

  @ApiProperty({
    description: 'City name',
    example: 'Alexandria',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'HTTP response code',
    example: 200,
    type: 'integer',
  })
  code: number;
}
