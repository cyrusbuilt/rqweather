import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { WinstonModule } from 'nest-winston';
import { GeoModule } from './geo/geo.module';
import * as winston from 'winston';
import { HttpModule } from '@nestjs/axios';
import { DownloaderModule } from './downloader/downloader.module';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/server.log' }),
      ],
    }),
    WeatherModule,
    GeoModule,
    HttpModule,
    DownloaderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
