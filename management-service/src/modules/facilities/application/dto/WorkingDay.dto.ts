import { ApiProperty } from '@nestjs/swagger';

import { WeekDay } from '../../domain/types';
import { WorkingHoursDto } from './WorkingHours.dto';

export class WorkingDayDto {
  @ApiProperty({ enum: WeekDay })
  dayName: WeekDay;

  @ApiProperty({
    type: [WorkingHoursDto],
  })
  hours: WorkingHoursDto[];
}
