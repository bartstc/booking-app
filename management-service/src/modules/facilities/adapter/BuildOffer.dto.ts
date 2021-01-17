import { ApiProperty } from '@nestjs/swagger';

import { PriceDto } from '../application/dto';

export class BuildOfferDto {
  @ApiProperty()
  offerName: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  price: PriceDto;
}
