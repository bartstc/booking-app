import { ApiProperty } from '@nestjs/swagger';

import { ContactDto } from 'shared/domain/dto';
import { AddressDto } from '../application/dto';

export class BuildCustomerDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  address: AddressDto;

  @ApiProperty({ type: [ContactDto] })
  contacts: ContactDto[];

  @ApiProperty()
  description?: string;
}
