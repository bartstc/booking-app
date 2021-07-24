import { ApiProperty } from '@nestjs/swagger';

import { ContactDto } from 'shared/domain/dto';

export class BuildEmployeeDto {
  @ApiProperty()
  employeeName: string;

  @ApiProperty()
  employeeEmail: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  employmentDate: Date;

  @ApiProperty({ type: [ContactDto] })
  contacts?: ContactDto[];

  @ApiProperty({ isArray: true })
  facilityIds?: string[];
}
