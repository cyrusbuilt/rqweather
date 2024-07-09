import * as dotenv from 'dotenv';

export default class Configuration {
  public static shared = new Configuration();

  public readonly serverPort: number;
  public readonly openWeatherApiKey: string;
  public readonly iconBaseUrl: string;
  public readonly apiBaseUrl: string;
  private _iconCache: string;
  private _appUrl: string;

  public get iconCache(): string {
    return this._iconCache;
  }

  public get appUrl(): string {
    return this._appUrl;
  }

  public get iconCacheUrlBase(): string {
    return `${this.appUrl}/icons/`;
  }

  public setIconCache(path: string): void {
    this._iconCache = path;
  }

  constructor() {
    dotenv.config();
    this.serverPort = 3000;
    if (process.env.PORT) {
      this.serverPort = parseInt(process.env.PORT);
    }

    this.openWeatherApiKey = '';
    if (process.env.WEATHER_API_KEY) {
      this.openWeatherApiKey = process.env.WEATHER_API_KEY;
    }

    this.iconBaseUrl = '';
    if (process.env.ICON_BASE_URL) {
      this.iconBaseUrl = process.env.ICON_BASE_URL;
    }

    this.apiBaseUrl = '';
    if (process.env.API_BASE_URL) {
      this.apiBaseUrl = process.env.API_BASE_URL;
    }

    this._appUrl = '';
    if (process.env.APP_BASE_URL) {
      this._appUrl = process.env.APP_BASE_URL;
    }
  }
}
