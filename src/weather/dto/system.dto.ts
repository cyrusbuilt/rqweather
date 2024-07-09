import { ApiProperty } from '@nestjs/swagger';

export class SystemDTO {
  @ApiProperty({
    description: 'Internal parameter',
    example: 2,
    type: 'integer',
  })
  type: number;

  @ApiProperty({
    description: 'Internal parameter',
    example: 2032744,
    type: 'integer',
  })
  id: number;

  @ApiProperty({
    description: 'Internal parameter',
    example: 'some message',
    type: 'string',
    nullable: true,
    required: false,
  })
  message?: string;

  @ApiProperty({
    description: 'The country code',
    example: 'US',
    type: 'string',
  })
  country: string;

  @ApiProperty({
    description: 'Sunrise time, unix, UTC',
    example: 1713783017,
    type: 'integer',
  })
  sunrise: number;

  @ApiProperty({
    description: 'Sunset time, unix, UTC',
    example: 1713831676,
    type: 'integer',
  })
  sunset: number;
}
