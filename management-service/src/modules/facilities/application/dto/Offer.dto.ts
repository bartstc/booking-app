import { ApiProperty } from '@nestjs/swagger';

import { OfferStatus } from '../../domain/types';
import { PriceDto } from './Price.dto';

export class OfferDto {
  @ApiProperty()
  offerId: string;

  @ApiProperty()
  facilityId: string;

  @ApiProperty({ enum: OfferStatus })
  status: OfferStatus;

  @ApiProperty()
  name: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  price: PriceDto;
}
