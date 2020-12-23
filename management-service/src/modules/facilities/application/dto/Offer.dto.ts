import { ApiProperty } from '@nestjs/swagger';

import { OfferVariantDto } from './OfferVariant.dto';

export class OfferDto {
  @ApiProperty()
  offerId: string;

  @ApiProperty()
  facilityId: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [OfferVariantDto] })
  variants: OfferVariantDto[];
}
