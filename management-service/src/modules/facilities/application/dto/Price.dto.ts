import { ApiProperty } from '@nestjs/swagger';

import { Currency, PriceModel } from '../../domain/types';

export class PriceDto {
  @ApiProperty({ enum: PriceModel })
  type: PriceModel;

  @ApiProperty()
  value: string;

  @ApiProperty({ enum: Currency })
  currency: Currency;
}
