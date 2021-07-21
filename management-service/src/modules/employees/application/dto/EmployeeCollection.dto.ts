import { ApiProperty } from '@nestjs/swagger';

import { MetaDto } from 'shared/core/dto';

import { EmployeeDto } from './Employee.dto';

export class EmployeeCollectionDto {
  @ApiProperty({ type: [EmployeeDto] })
  collection: EmployeeDto[];

  @ApiProperty()
  meta: MetaDto;
}
