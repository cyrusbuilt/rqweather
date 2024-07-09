import { Controller, Get, Head, HttpStatus, Query, Res } from '@nestjs/common';
import { GeoService } from './geo.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GeoDTO } from './dto/geo.dto';
import GeoAdapters from './dto/geo-adapters';
import Utils from 'src/common/utils';
import { Response } from 'express';

@ApiTags('geo')
@Controller('api/geo')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @Get()
  @ApiOperation({
    description: 'Gets geolocation data for the specified location ',
  })
  @ApiQuery({ name: 'city', type: 'string' })
  @ApiQuery({ name: 'stateCode', type: 'string', required: false })
  @ApiQuery({ name: 'countryCode', type: 'string', required: false })
  @ApiResponse({
    status: HttpStatus.OK as number,
    description: 'Success',
    type: [GeoDTO],
  })
  public async getGeolocationData(
    @Query('city') city: string,
    @Query('stateCode') state?: string,
    @Query('countryCode') country?: string,
  ): Promise<GeoDTO[]> {
    const result = await this.geoService.getLocationData(city, state, country);
    return result.map((geo) => GeoAdapters.toGeo(geo));
  }

  @Head()
  @ApiOperation({
    description:
      'HEAD servicer for get geolocation data endpoint (legacy support)',
  })
  @ApiQuery({ name: 'city', type: 'string' })
  @ApiQuery({ name: 'stateCode', type: 'string' })
  @ApiQuery({ name: 'countryCode', type: 'string' })
  @ApiResponse({
    status: HttpStatus.OK as number,
    description: 'Success',
  })
  public getGeolocationDataHead(
    @Res() res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('city') city: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('stateCode') state: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('countryCode') country: string,
  ): void {
    Utils.sendOkHeaders(res);
  }
}
