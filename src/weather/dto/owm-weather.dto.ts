import { OwmCloudsDTO } from './owm-clouds.dto';
import { OwmCoordinateDTO } from '../../geo/dto/owm-coordinate.dto';
import { OwmMainDTO } from './owm-main.dto';
import { OwmRainDTO } from './owm-rain.dto';
import { OwmSnowDTO } from './owm-snow.dto';
import { OwmSystemDTO } from './owm-system.dto';
import { OwmWeatherConditionDTO } from './owm-weather-condition.dto';
import { OwmWindDTO } from './owm-wind.dto';

export interface OwmWeatherDTO {
  coord: OwmCoordinateDTO;
  weather: OwmWeatherConditionDTO[];
  base: string;
  main: OwmMainDTO;
  visibility: number;
  wind: OwmWindDTO;
  clouds: OwmCloudsDTO;
  rain?: OwmRainDTO;
  snow?: OwmSnowDTO;
  dt: number;
  sys: OwmSystemDTO;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
