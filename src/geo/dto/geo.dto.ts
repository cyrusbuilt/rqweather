import { ApiProperty } from '@nestjs/swagger';

export class GeoDTO {
  @ApiProperty({
    description: 'Name of the found location',
    example: 'alexandria',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description:
      'A hash-map containing key/value pairs where key = language code, value = ASCII name of the location',
  })
  localNames: Record<string, string>;

  @ApiProperty({
    description: 'Geolocation coordinate (latitude)',
    example: 38.9595078,
    type: 'float',
  })
  latitude: number;

  @ApiProperty({
    description: 'Geolocation coordinate (longitude)',
    example: -84.3879946,
    type: 'float',
  })
  longitude: number;

  @ApiProperty({
    description: 'Country for the found location',
    example: 'US',
    type: 'string',
  })
  country: string;

  @ApiProperty({
    description: 'State of the found location (if available)',
    example: 'KY',
    type: 'string',
    nullable: true,
    required: false,
  })
  state?: string;
}
