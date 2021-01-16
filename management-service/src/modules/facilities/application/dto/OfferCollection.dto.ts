import { ApiProperty } from '@nestjs/swagger';

import { MetaDto } from 'shared/core/dto';

import { OfferDto } from './Offer.dto';

export class OfferCollectionDto {
  @ApiProperty({ type: [OfferDto] })
  collection: OfferDto[];

  @ApiProperty()
  meta: MetaDto;
}
