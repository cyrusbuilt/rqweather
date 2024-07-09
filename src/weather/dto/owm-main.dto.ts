export interface OwmMainDTO {
  temp: number;
  feels_like: number;
  pressure: number;
  humidty: number;
  temp_min: number;
  temp_max: number;
  sea_level?: number;
  grnd_level?: number;
  temp_kf?: number;
}
