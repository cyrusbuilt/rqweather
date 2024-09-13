import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CloudsDTO } from './clouds.dto';
import { ForecastSysDTO } from './forecast-sys.dto';
import { MainDTO } from './main.dto';
import { RainDTO } from './rain.dto';
import { SnowDTO } from './snow.dto';
import { WeatherConditionDTO } from './weather-condition.dto';
import { WindDTO } from './wind.dto';

export class DailyForecastDTO {
  @ApiProperty({
    description: 'Timestamp of data forecasted (UTC)',
    example: new Date().toUTCString(),
    type: Date,
  })
  timestamp: Date;

  @ApiProperty({
    description: 'Main weather data',
    type: MainDTO,
  })
  main: MainDTO;

  @ApiProperty({
    description: 'A list of forecasted weather conditions',
    type: [WeatherConditionDTO],
  })
  weather: WeatherConditionDTO[];

  @ApiProperty({
    description: 'Cloudiness data',
    type: CloudsDTO,
  })
  clouds: CloudsDTO;

  @ApiProperty({
    description: 'Wind data',
    type: WindDTO,
  })
  wind: WindDTO;

  @ApiProperty({
    description: 'Rain precipitation data (if available)',
    type: OmitType(RainDTO, ['oneHour']),
    nullable: true,
    required: false,
  })
  rain?: Omit<RainDTO, 'oneHour'>;

  @ApiProperty({
    description: 'Snow precipitation (if available)',
    type: OmitType(SnowDTO, ['oneHour']),
    nullable: true,
    required: false,
  })
  snow?: Omit<SnowDTO, 'oneHour'>;

  @ApiProperty({
    description: 'Visibility in meters (10km max)',
    example: 1200,
    type: 'integer',
  })
  visibility: number;

  @ApiProperty({
    description: 'The possiblity of precipitation (percentage)',
    example: 20,
    type: 'integer',
  })
  possibilityOfPrecipitation: number;

  @ApiProperty({
    description: 'System data',
    type: ForecastSysDTO,
  })
  system: ForecastSysDTO;

  @ApiProperty({
    description: 'Timestamp of forecast data (ISO UTC, as string)',
    example: '2024-04-26 00:00:00',
    type: 'string',
  })
  timestampText: string;
}
