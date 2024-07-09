import { ApiProperty } from '@nestjs/swagger';

export class CloudsDTO {
  @ApiProperty({
    description: 'Cloudiness, percentage',
    example: 20,
    type: 'integer',
  })
  all: number;

  constructor(all: number) {
    this.all = all;
  }
}
