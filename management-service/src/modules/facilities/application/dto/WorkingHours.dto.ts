import { ApiProperty } from '@nestjs/swagger';

export class WorkingHoursDto {
  @ApiProperty()
  until: string;

  @ApiProperty()
  to: string;
}
