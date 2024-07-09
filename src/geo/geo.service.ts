import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { catchError, firstValueFrom } from 'rxjs';
import Configuration from 'src/configuration';
import { Logger } from 'winston';
import { OwmGeoDTO } from './dto/owm-geo.dto';
import { AxiosError } from 'axios';

@Injectable()
export class GeoService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  public async getLocationData(
    city: string,
    stateCode?: string,
    countryCode?: string,
  ): Promise<OwmGeoDTO[]> {
    let url = Configuration.shared.apiBaseUrl;
    url = `${url}geo/1.0/direct?q=${city}`;
    if (stateCode) {
      url = `${url},${stateCode}`;
    }

    if (countryCode) {
      url = `${url},${countryCode}`;
    }

    url = `${url}&appid=${Configuration.shared.openWeatherApiKey}`;
    url = `${url}&limit=10`;

    this.logger.info(`Requesting geolocation data from: ${url} ...`);
    const { data } = await firstValueFrom(
      this.httpService.get<OwmGeoDTO[]>(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new InternalServerErrorException(error.response.data);
        }),
      ),
    );
    return data;
  }
}
