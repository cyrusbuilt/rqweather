import { OwmForecastCityDTO } from 'src/geo/dto/owm-forecast-city.dto';
import { OwmDailyForecastDTO } from './owm-daily-forecast.dto';

export interface OwmForecastDTO {
  cod: number | string;
  message: number | string;
  cnt: number;
  list: OwmDailyForecastDTO[];
  city: OwmForecastCityDTO;
}
