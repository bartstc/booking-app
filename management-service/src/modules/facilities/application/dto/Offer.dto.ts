import { ApiProperty } from '@nestjs/swagger';

import { OfferVariantDto } from './OfferVariant.dto';
import { OfferStatus } from '../../domain/types';

export class OfferDto {
  @ApiProperty()
  offerId: string;

  @ApiProperty()
  facilityId: string;

  @ApiProperty({ enum: OfferStatus })
  status: OfferStatus;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [OfferVariantDto] })
  variants: OfferVariantDto[];
}
