import { CoordinateDTO } from './coordinate.dto';
import { ForecastCityDTO } from './forecast-city.dto';
import { GeoDTO } from './geo.dto';
import { OwmCoordinateDTO } from './owm-coordinate.dto';
import { OwmForecastCityDTO } from './owm-forecast-city.dto';
import { OwmGeoDTO } from './owm-geo.dto';

export default class GeoAdapters {
  public static toCoordinate(coord: OwmCoordinateDTO): CoordinateDTO {
    return new CoordinateDTO(coord.lat, coord.lon);
  }

  public static toGeo(from: OwmGeoDTO): GeoDTO {
    const result = new GeoDTO();
    result.name = from.name;
    result.localNames = from.local_names;
    result.latitude = from.lat;
    result.longitude = from.lon;
    result.country = from.country;
    result.state = from.state;
    return result;
  }

  public static toForecastCity(from: OwmForecastCityDTO): ForecastCityDTO {
    const result = new ForecastCityDTO();
    result.id = from.id;
    result.name = from.name;
    result.coordinates = GeoAdapters.toCoordinate(from.coord);
    result.country = from.country;
    result.population = from.population;
    result.timezone = from.timezone;

    const sunrise = new Date();
    sunrise.setSeconds(from.sunrise);
    result.sunrise = sunrise;

    const sunset = new Date();
    sunset.setSeconds(from.sunset);
    result.sunset = sunset;
    return result;
  }
}
