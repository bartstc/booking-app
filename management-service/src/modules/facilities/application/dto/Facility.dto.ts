import { ApiProperty } from '@nestjs/swagger';

import { ContactDto, ContactPersonDto } from 'shared/domain/dto';
import { AddressDto } from './Address.dto';
import { BusinessCategoryDto } from './BusinessCategory.dto';
import { WorkingDayDto } from './WorkingDay.dto';
import { Currency } from '../../domain/types';

export class FacilityDto {
  @ApiProperty()
  facilityId: string;

  @ApiProperty()
  enterpriseId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty({ enum: Currency })
  currency: Currency;

  @ApiProperty()
  contactPerson: ContactPersonDto | null;

  @ApiProperty()
  address: AddressDto;

  @ApiProperty({ type: [BusinessCategoryDto] })
  businessCategories: BusinessCategoryDto[];

  @ApiProperty({ type: [ContactDto] })
  contacts: ContactDto[];

  @ApiProperty({ type: [WorkingDayDto] })
  workingDays: WorkingDayDto[];
}
