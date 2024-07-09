import { ApiProperty } from '@nestjs/swagger';

export class WeatherConditionDTO {
  @ApiProperty({
    description: 'Weather condition ID',
    example: 800,
    type: 'integer',
  })
  id: number;

  @ApiProperty({
    description: 'Group of weather parameters (rain, snow, clouds, etc)',
    example: 'Clear',
    type: 'string',
  })
  main: string;

  @ApiProperty({
    description: 'Weather condition within the group',
    example: 'clear',
    type: 'string',
  })
  description: string;

  @ApiProperty({
    description: 'Full URL to the icon image of weather condition',
  })
  icon: string;

  constructor(
    id: number = 0,
    main: string = '',
    desc: string = '',
    icon: string = '',
  ) {
    this.id = id;
    this.main = main;
    this.description = desc;
    this.icon = icon;
  }
}
