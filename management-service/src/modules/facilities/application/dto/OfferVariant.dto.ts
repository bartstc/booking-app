import { ApiProperty } from '@nestjs/swagger';

import { PriceDto } from './Price.dto';

export class OfferVariantDto {
  @ApiProperty()
  duration: number;

  @ApiProperty()
  price: PriceDto;
}
