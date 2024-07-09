import { ApiProperty } from '@nestjs/swagger';
import { PartOfDay } from '../../common/enum/part-of-day';

export class ForecastSysDTO {
  @ApiProperty({
    description: 'The part of the day (n - night, d - day)',
    enum: PartOfDay,
  })
  partOfDay: PartOfDay;

  constructor(pod: PartOfDay) {
    this.partOfDay = pod;
  }
}
