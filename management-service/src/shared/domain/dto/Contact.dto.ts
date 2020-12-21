import { ApiProperty } from '@nestjs/swagger';

import { ContactType } from '../types';

export class ContactDto {
  @ApiProperty({ enum: ContactType })
  type: ContactType;

  @ApiProperty()
  value: string;
}
