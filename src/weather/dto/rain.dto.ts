import { ApiProperty } from '@nestjs/swagger';

export class RainDTO {
  @ApiProperty({
    description: 'Rain volume for the last hour (mm)',
    example: 10,
    type: 'float',
  })
  oneHour: number;

  @ApiProperty({
    description: 'Rain volume for the last 3 hours (mm)',
    example: 12,
    type: 'float',
  })
  threeHour: number;

  constructor(one: number, three: number) {
    this.oneHour = one;
    this.threeHour = three;
  }
}
