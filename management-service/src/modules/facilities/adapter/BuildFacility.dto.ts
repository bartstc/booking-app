import { ApiProperty } from '@nestjs/swagger';

import { ContactDto, ContactPersonDto } from 'shared/domain/dto';
import {
  AddressDto,
  BusinessCategoryDto,
  WorkingDayDto,
} from '../application/dto';
import { Currency } from '../domain/types';

export class BuildFacilityDto {
  @ApiProperty()
  facilityName: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  address: AddressDto;

  @ApiProperty({ type: [BusinessCategoryDto] })
  businessCategories: BusinessCategoryDto[];

  @ApiProperty({ type: [ContactDto] })
  contacts: ContactDto[];

  @ApiProperty({ type: [WorkingDayDto] })
  availability: WorkingDayDto[];

  @ApiProperty()
  facilityDescription?: string;

  @ApiProperty()
  contactPerson?: ContactPersonDto;

  @ApiProperty({ enum: Currency })
  currency: Currency;
}
