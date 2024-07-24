import {
  Controller,
  Get,
  Head,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  ParseFloatPipe,
  Query,
  Res,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WeatherResponseDTO } from './dto/weather-response.dto';
import Adapters from './dto/adapters';
import Configuration from 'src/configuration';
import Utils from 'src/common/utils';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { DownloaderService } from 'src/downloader/downloader.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ForecastResponseDTO } from './dto/forecast-response.dto';
import { WeatherConditionDTO } from './dto/weather-condition.dto';
import { Response } from 'express';

@ApiTags('weather')
@Controller('api/weather')
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly downloader: DownloaderService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  private async cacheWeatherIcons(
    weather: WeatherConditionDTO[],
  ): Promise<WeatherConditionDTO[]> {
    const result: WeatherConditionDTO[] = [];
    const cache = Configuration.shared.iconCache;
    for (const w of weather) {
      const filename = Utils.getFilenameFromUrl(w.icon);
      const cacheFile = join(cache, filename);
      if (!existsSync(cacheFile)) {
        try {
          this.logger.info(`Caching icon file: ${w.icon}`);
          const result = await this.downloader.downloadFile(w.icon);
          writeFileSync(cacheFile, Buffer.from(result));
        } catch (e: any) {
          const err = e as Error;
          this.logger.error(
            `Failed to download file ${w.icon} to ${cacheFile}: ${err.message}`,
          );
        }
      }

      w.icon = `${Configuration.shared.iconCacheUrlBase}${filename}`;
      result.push(w);
    }

    return result;
  }

  @Get('current')
  @ApiOperation({ description: 'Gets current weather conditions' })
  @ApiQuery({ name: 'lat', type: 'number' })
  @ApiQuery({ name: 'lon', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK as number,
    description: 'Success',
    type: WeatherResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR as number,
    description: 'Failed to retrieve or parse weather data',
    type: InternalServerErrorException,
  })
  public async getCurrent(
    @Query('lat', new ParseFloatPipe()) lat: number,
    @Query('lon', new ParseFloatPipe()) lon: number,
  ): Promise<WeatherResponseDTO> {
    const current = await this.weatherService.getCurrentWeather(lat, lon);
    const theWeather = Adapters.toCurrentWeather(current);
    if (theWeather.weather.length) {
      theWeather.weather = await this.cacheWeatherIcons(theWeather.weather);
    }

    return theWeather;
  }

  @Head('current')
  @ApiOperation({
    description:
      'HEAD servicer for the get current weather endpoint (legacy support)',
  })
  @ApiQuery({ name: 'lat', type: 'number' })
  @ApiQuery({ name: 'lon', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK as number,
    description: 'Success',
  })
  public getCurrentHead(
    @Res() res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('lat', new ParseFloatPipe()) lat: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('lon', new ParseFloatPipe()) lon: number,
  ): void {
    Utils.sendOkHeaders(res);
  }

  @Get('forecast')
  @ApiOperation({
    description:
      'Gets 5-day, 3-hour weather forecast for the specified location',
  })
  @ApiQuery({ name: 'lat', type: 'number' })
  @ApiQuery({ name: 'lon', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK as number,
    description: 'Success',
    type: ForecastResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR as number,
    description: 'Failed to retrieve or parse weather data',
    type: InternalServerErrorException,
  })
  public async getForecast(
    @Query('lat', new ParseFloatPipe()) lat: number,
    @Query('lon', new ParseFloatPipe()) lon: number,
  ): Promise<ForecastResponseDTO> {
    const forecast = await this.weatherService.getForecast(lat, lon);
    const theForecast = Adapters.toForecastedWeather(forecast);
    for (const f of theForecast.list) {
      if (f.weather.length) {
        f.weather = await this.cacheWeatherIcons(f.weather);
      }
    }

    return theForecast;
  }

  @Head('forecast')
  @ApiOperation({
    description: 'HEAD servicer for the get forecast endpoint (legacy support)',
  })
  @ApiQuery({ name: 'lat', type: 'number' })
  @ApiQuery({ name: 'lon', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK as number,
    description: 'Success',
  })
  public getForecastHead(
    @Res() res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('lat', new ParseFloatPipe()) lat: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('lon', new ParseFloatPipe()) lon: number,
  ): void {
    Utils.sendOkHeaders(res);
  }
}
