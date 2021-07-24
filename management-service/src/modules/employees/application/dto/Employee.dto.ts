import { ApiProperty } from '@nestjs/swagger';

import { ContactDto } from 'shared/domain/dto';

import { EmployeeStatus } from '../../domain';
import { EmployeeScopeDto } from './EmployeeScope.dto';

export class EmployeeDto {
  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  enterpriseId: string;

  @ApiProperty({ enum: EmployeeStatus })
  status: EmployeeStatus;

  @ApiProperty()
  email: string;

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

  @ApiProperty({ type: [EmployeeScopeDto] })
  scope: EmployeeScopeDto;
}
