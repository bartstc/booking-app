import { ApiProperty } from '@nestjs/swagger';

import { ContactDto } from 'shared/domain/dto';

export class BuildEmployeeDto {
  @ApiProperty()
  employeeName: string;

  @ApiProperty()
  position: string;

  @ApiProperty({ type: [ContactDto] })
  contacts?: ContactDto[];
}
