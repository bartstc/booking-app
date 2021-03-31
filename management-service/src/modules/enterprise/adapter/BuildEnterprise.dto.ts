import { ApiProperty } from '@nestjs/swagger';

import { ContactPersonDto } from 'shared/domain/dto';

export class BuildEnterpriseDto {
  @ApiProperty()
  enterpriseName: string;

  @ApiProperty()
  enterpriseDescription: string;

  @ApiProperty()
  enterpriseUrl: string;

  @ApiProperty()
  contactPerson: ContactPersonDto;
}
