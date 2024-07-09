import { Module } from '@nestjs/common';
import { DownloaderService } from './downloader.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [DownloaderService],
  exports: [DownloaderService],
})
export class DownloaderModule {}
