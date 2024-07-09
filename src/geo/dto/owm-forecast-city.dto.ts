import { OwmCoordinateDTO } from 'src/geo/dto/owm-coordinate.dto';

export interface OwmForecastCityDTO {
  id: number;
  name: string;
  coord: OwmCoordinateDTO;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}
