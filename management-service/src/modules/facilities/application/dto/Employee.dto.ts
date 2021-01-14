import { ApiProperty } from '@nestjs/swagger';

import { ContactDto } from 'shared/domain/dto';
import { EmployeeStatus } from '../../domain/types';

export class EmployeeDto {
  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  facilityId: string;

  @ApiProperty({ enum: EmployeeStatus })
  status: EmployeeStatus;

  @ApiProperty()
  name: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  employmentDate: Date;

  @ApiProperty({ type: [ContactDto] })
  contacts: ContactDto[];
}
