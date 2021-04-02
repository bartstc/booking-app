import { ApiProperty } from '@nestjs/swagger';

import { ContactPersonDto } from 'shared/domain/dto';

export class EnterpriseDto {
  @ApiProperty()
  enterpriseId: string;

  @ApiProperty()
  enterpriseName: string;

  @ApiProperty()
  enterpriseDescription: string;

  @ApiProperty()
  enterpriseUrl: string;

  @ApiProperty()
  contactPerson: ContactPersonDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
