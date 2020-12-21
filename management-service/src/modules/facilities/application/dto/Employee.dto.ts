import { ApiProperty } from '@nestjs/swagger';

import { ContactDto } from 'shared/domain/dto';

export class EmployeeDto {
  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  facilityId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  position: string;

  @ApiProperty({ type: [ContactDto] })
  contacts: ContactDto[];
}
