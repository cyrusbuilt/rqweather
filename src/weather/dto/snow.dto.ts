import { ApiProperty } from '@nestjs/swagger';

export class SnowDTO {
  @ApiProperty({
    description: 'Snow volume for the last 1 hour (mm)',
    example: 12,
    type: 'float',
  })
  oneHour: number;

  @ApiProperty({
    description: 'Snow volume for the last 3 hours (mm)',
    example: 22,
    type: 'float',
  })
  threeHour: number;

  constructor(one: number, three: number) {
    this.oneHour = one;
    this.threeHour = three;
  }
}
