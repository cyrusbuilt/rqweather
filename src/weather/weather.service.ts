import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { OwmWeatherDTO } from './dto/owm-weather.dto';
import Configuration from 'src/configuration';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { OwmForecastDTO } from './dto/owm-forecast.dto';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  public async getCurrentWeather(
    lat: number,
    lon: number,
  ): Promise<OwmWeatherDTO> {
    // TODO support changing units
    let url = Configuration.shared.apiBaseUrl;
    url = `${url}data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial`;
    url = `${url}&appid=${Configuration.shared.openWeatherApiKey}`;
    this.logger.info(`Requesting weather data from url: ${url} ...`);

    const { data } = await firstValueFrom(
      this.httpService.get<OwmWeatherDTO>(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new InternalServerErrorException(error.response.data);
        }),
      ),
    );

    return data;
  }

  public async getForecast(lat: number, lon: number): Promise<OwmForecastDTO> {
    // TODO support changing units
    let url = Configuration.shared.apiBaseUrl;
    url = `${url}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial`;
    url = `${url}&appid=${Configuration.shared.openWeatherApiKey}`;
    this.logger.info(`Requesting forecast data from url: ${url}`);

    const { data } = await firstValueFrom(
      this.httpService.get<OwmForecastDTO>(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new InternalServerErrorException(error.response.data);
        }),
      ),
    );

    return data;
  }
}
