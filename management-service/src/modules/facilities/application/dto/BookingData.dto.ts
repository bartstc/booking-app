import { ApiProperty } from '@nestjs/swagger';

import { OfferVariantDto } from './OfferVariant.dto';

class FacilityDataDto {
  @ApiProperty()
  name: string;
}

class EmployeeDataDto {
  @ApiProperty()
  name: string;
}

class OfferDataDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: [OfferVariantDto] })
  variants: OfferVariantDto[];
}

export class BookingDataDto {
  @ApiProperty()
  facility: FacilityDataDto;

  @ApiProperty()
  employee: EmployeeDataDto;

  @ApiProperty()
  offer: OfferDataDto;
}
