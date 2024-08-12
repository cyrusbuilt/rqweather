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
    example: '2024-08-12T15:27:35.000Z',
    type: 'date',
  })
  sunrise: Date;

  @ApiProperty({
    description: 'Sunset time, unix, UTC',
    example: '2024-08-12T15:27:35.000Z',
    type: 'date',
  })
  sunset: Date;
}
