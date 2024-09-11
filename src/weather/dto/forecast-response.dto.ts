import { ForecastCityDTO } from 'src/geo/dto/forecast-city.dto';
import { DailyForecastDTO } from './daily-forecast.dto';
import { DailyForecastAggregateDTO } from './daily-forecast-aggregate.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ForecastResponseDTO {
  @ApiProperty({
    description: 'API response code',
    example: 200,
    type: 'integer',
  })
  code: number;

  @ApiProperty({
    description: 'The number of timestamps returned in the API response',
    example: 40,
    type: 'integer',
  })
  count: number;

  @ApiProperty({
    description: 'A list of daily forecast data',
    type: [DailyForecastDTO],
  })
  list: DailyForecastDTO[];

  @ApiProperty({
    description: 'City data for the forecasted weather',
    type: ForecastCityDTO,
  })
  city: ForecastCityDTO;

  @ApiProperty({
    description: 'Aggregates of the daily forecast (daily summary)',
    type: DailyForecastAggregateDTO,
  })
  aggregates: DailyForecastAggregateDTO[];
}
