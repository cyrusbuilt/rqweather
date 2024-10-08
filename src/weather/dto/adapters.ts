import Configuration from 'src/configuration';
import { MainDTO } from './main.dto';
import { OwmMainDTO } from './owm-main.dto';
import { OwmWeatherConditionDTO } from './owm-weather-condition.dto';
import { OwmWindDTO } from './owm-wind.dto';
import { WeatherConditionDTO } from './weather-condition.dto';
import { WindDTO } from './wind.dto';
import { OwmCloudsDTO } from './owm-clouds.dto';
import { CloudsDTO } from './clouds.dto';
import { OwmRainDTO } from './owm-rain.dto';
import { RainDTO } from './rain.dto';
import { OwmSnowDTO } from './owm-snow.dto';
import { SnowDTO } from './snow.dto';
import { OwmSystemDTO } from './owm-system.dto';
import { SystemDTO } from './system.dto';
import { OwmWeatherDTO } from './owm-weather.dto';
import { WeatherResponseDTO } from './weather-response.dto';
import GeoAdapters from 'src/geo/dto/geo-adapters';
import { OwmDailyForecastDTO } from './owm-daily-forecast.dto';
import { ForecastResponseDTO } from './forecast-response.dto';
import { OwmForecastDTO } from './owm-forecast.dto';
import Utils from 'src/common/utils';
import { DailyForecastDTO } from './daily-forecast.dto';
import { OwmForecastSysDTO } from './owm-forecast-sys.dto';
import { ForecastSysDTO } from './forecast-sys.dto';
import { DailyForecastAggregateDTO } from './daily-forecast-aggregate.dto';

interface ForecastDictionary {
  [key: string]: DailyForecastDTO;
}

export default class Adapters {
  public static toWeatherCondition(
    cond: OwmWeatherConditionDTO,
  ): WeatherConditionDTO {
    let icon = Configuration.shared.iconBaseUrl;
    icon = `${icon}${cond.icon}@2x.png`;
    return new WeatherConditionDTO(cond.id, cond.main, cond.description, icon);
  }

  public static toMain(from: OwmMainDTO): MainDTO {
    const result = new MainDTO();
    result.temp = from.temp;
    result.feelsLike = from.feels_like;
    result.pressure = from.pressure;
    result.humidity = from.humidty;
    result.tempMin = from.temp_min;
    result.tempMax = from.temp_max;
    result.seaLevel = from.sea_level;
    result.groundLevel = from.grnd_level;
    result.tempKf = from.temp_kf;
    return result;
  }

  public static toWind(from: OwmWindDTO): WindDTO {
    return new WindDTO(from.speed, from.deg, from.gust);
  }

  public static toClouds(clouds: OwmCloudsDTO): CloudsDTO {
    return new CloudsDTO(clouds.all);
  }

  public static toRain(from?: OwmRainDTO): RainDTO | undefined {
    return !from ? undefined : new RainDTO(from['1h'], from['3h']);
  }

  public static toForecastRain(
    from?: Omit<OwmRainDTO, '1h'>,
  ): Omit<RainDTO, 'oneHour'> | undefined {
    if (!from) {
      return undefined;
    }

    const result: Omit<RainDTO, 'oneHour'> = {
      threeHour: from['3h'],
    };

    return result;
  }

  public static toForecastSnow(
    from?: Omit<OwmSnowDTO, '1h'>,
  ): Omit<SnowDTO, 'oneHour'> | undefined {
    if (!from) {
      return undefined;
    }

    const result: Omit<SnowDTO, 'oneHour'> = {
      threeHour: from['3h'],
    };

    return result;
  }

  public static toSnow(from?: OwmSnowDTO): SnowDTO | undefined {
    return !from ? undefined : new SnowDTO(from['1h'], from['3h']);
  }

  public static toSystem(from: OwmSystemDTO): SystemDTO {
    const result = new SystemDTO();
    result.type = from.type;
    result.id = from.id;
    result.message = from.message;
    result.country = from.country;
    result.sunrise = new Date(Date.UTC(1970, 0, 1, 0, 0, from.sunrise));
    result.sunset = new Date(Date.UTC(1970, 0, 1, 0, 0, from.sunset));
    return result;
  }

  public static toCurrentWeather(from: OwmWeatherDTO): WeatherResponseDTO {
    const result = new WeatherResponseDTO();
    result.id = from.id;
    result.code = from.cod;
    result.name = from.name;
    result.base = from.base;
    result.timestamp = new Date(Date.UTC(1970, 0, 1, 0, 0, from.dt));
    result.timezone = from.timezone;
    result.visibility = from.visibility;
    result.clouds = Adapters.toClouds(from.clouds);
    result.coord = GeoAdapters.toCoordinate(from.coord);
    result.main = Adapters.toMain(from.main);
    result.rain = Adapters.toRain(from.rain);
    result.snow = Adapters.toSnow(from.snow);
    result.system = Adapters.toSystem(from.sys);
    result.weather = from.weather.map((w) => Adapters.toWeatherCondition(w));
    result.wind = Adapters.toWind(from.wind);
    return result;
  }

  public static toForecastSystem(from: OwmForecastSysDTO): ForecastSysDTO {
    return new ForecastSysDTO(from.pod);
  }

  public static toDailyForecast(from: OwmDailyForecastDTO): DailyForecastDTO {
    const result = new DailyForecastDTO();
    result.clouds = Adapters.toClouds(from.clouds);
    result.main = Adapters.toMain(from.main);
    result.possibilityOfPrecipitation = from.pop;
    result.rain = Adapters.toForecastRain(from.rain);
    result.snow = Adapters.toForecastSnow(from.snow);
    result.system = Adapters.toForecastSystem(from.sys);
    result.timestamp = new Date(from.dt * 1000);
    result.timestampText = from.dt_text;
    result.visibility = from.visibility;
    result.weather = from.weather.map((w) => Adapters.toWeatherCondition(w));
    result.wind = Adapters.toWind(from.wind);
    return result;
  }

  public static toForecastedWeather(from: OwmForecastDTO): ForecastResponseDTO {
    const result = new ForecastResponseDTO();
    result.code = Utils.forceInt(from.cod);
    result.count = from.cnt;
    result.list = from.list.map((d) => Adapters.toDailyForecast(d));
    result.city = GeoAdapters.toForecastCity(from.city);

    // Daily forecast aggregation pt 1:
    // The 5-day 3-hour forecast returns a list of 40 weather condition records:
    // That's 1 record for every 3 hours for a total of 8 records per day for 5 days.
    // Here, we first chunk the records by date and compute the high and low temps
    // for the day.
    const agg: ForecastDictionary = {};
    result.list.forEach((val) => {
      const date = val.timestamp.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
      });
      if (!agg[date]) {
        agg[date] = val;
      }

      if (val.main.tempMax > agg[date].main.tempMax) {
        agg[date].main.tempMax = val.main.tempMax;
      }

      if (val.main.tempMin < agg[date].main.tempMin) {
        agg[date].main.tempMin = val.main.tempMin;
      }
    });

    // Daily forecast aggregation pt 2:
    // Now, we build the daily records and populate the list.
    result.aggregates = Object.keys(agg).map((key: string, index: number) => {
      const val = agg[key];
      const forecast = new DailyForecastAggregateDTO();
      forecast.dayNum = index + 1;
      forecast.tempHigh = val.main.tempMax;
      forecast.tempLow = val.main.tempMin;
      forecast.icon = val.weather[0].icon;
      forecast.dateString = key;
      forecast.weatherType = val.weather[0].main;
      return forecast;
    });

    return result;
  }
}
