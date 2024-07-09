import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export default class Utils {
  public static sendOkHeaders(res: Response): void {
    res.set('Content-Length', '34');
    res.set('Date', new Date().toUTCString());
    res.set('Server', 'Express');
    res.status(HttpStatus.OK).send();
  }

  public static getFilenameFromUrl(url: string): string {
    if (url.includes('?')) {
      url = url.split('?')[0];
    }
    return url.substring(url.lastIndexOf('/') + 1);
  }

  public static forceInt(x: string | number | null | undefined): number {
    if (x === null || x === undefined) {
      return 0;
    }

    if (typeof x === 'string') {
      return parseInt(x);
    }

    return Number(x);
  }
}
