import { ApiProperty } from '@nestjs/swagger';

export class DailyForecastAggregateDTO {
  @ApiProperty({
    description: 'The day number of the five-day forecast',
    example: 3,
    type: 'integer',
  })
  dayNum: number;

  @ApiProperty({
    description: 'The lowest temperature for the day',
    example: 54.32,
    type: 'double',
  })
  tempLow: number;

  @ApiProperty({
    description: 'The highest temperature for the day',
    example: '61.54',
    type: 'double',
  })
  tempHigh: number;

  @ApiProperty({
    description: 'Full URL to the icon image of weather condition',
    type: 'string',
  })
  icon: string;

  @ApiProperty({
    description: 'Short date string for the day',
    example: '13 Fri',
    type: 'string',
  })
  dateString: string;

  @ApiProperty({
    description: 'The name of the weather condition',
    example: 'Rain',
    type: 'string',
  })
  weatherType: string;
}
