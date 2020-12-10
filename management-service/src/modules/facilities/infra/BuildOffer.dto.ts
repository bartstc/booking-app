import { ApiProperty } from '@nestjs/swagger';

import { OfferVariantDto } from '../application/dto';

export class BuildOfferDto {
  @ApiProperty()
  offerName: string;

  @ApiProperty({ type: [OfferVariantDto] })
  variants: OfferVariantDto[];
}
