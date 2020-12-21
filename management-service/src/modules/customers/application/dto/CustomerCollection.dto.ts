import { ApiProperty } from '@nestjs/swagger';

import { MetaDto } from 'shared/core/dto';
import { CustomerDto } from './Customer.dto';

export class CustomerCollectionDto {
  @ApiProperty({ type: [CustomerDto] })
  collection: CustomerDto[];

  @ApiProperty()
  meta: MetaDto;
}
