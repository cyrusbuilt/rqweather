import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { DownloaderModule } from 'src/downloader/downloader.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, DownloaderModule],
  providers: [WeatherService],
  controllers: [WeatherController],
  exports: [WeatherService],
})
export class WeatherModule {}
