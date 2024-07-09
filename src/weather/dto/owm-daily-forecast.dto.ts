import { OwmCloudsDTO } from './owm-clouds.dto';
import { OwmForecastSysDTO } from './owm-forecast-sys.dto';
import { OwmMainDTO } from './owm-main.dto';
import { OwmRainDTO } from './owm-rain.dto';
import { OwmSnowDTO } from './owm-snow.dto';
import { OwmWeatherConditionDTO } from './owm-weather-condition.dto';
import { OwmWindDTO } from './owm-wind.dto';

export interface OwmDailyForecastDTO {
  dt: number;
  main: OwmMainDTO;
  weather: OwmWeatherConditionDTO[];
  clouds: OwmCloudsDTO;
  wind: OwmWindDTO;
  rain?: Omit<OwmRainDTO, '1h'>;
  snow?: Omit<OwmSnowDTO, '1h'>;
  visibility: number;
  pop: number;
  sys: OwmForecastSysDTO;
  dt_text: string;
}
