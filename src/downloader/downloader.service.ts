import { HttpService } from '@nestjs/axios';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class DownloaderService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  public async downloadFile(url: string): Promise<ArrayBuffer> {
    const response = this.httpService.get(url, {
      responseType: 'arraybuffer',
    });

    return new Promise((resolve, reject) => {
      response.subscribe({
        next(response) {
          response.status === HttpStatus.OK
            ? resolve(response.data)
            : reject(response.data);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }
}
