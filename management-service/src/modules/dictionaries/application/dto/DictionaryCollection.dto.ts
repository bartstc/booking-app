import { ApiProperty } from '@nestjs/swagger';

import { MetaDto } from 'shared/core/dto';
import { DictionaryDto } from './Dictionary.dto';

export class DictionaryCollectionDto {
  @ApiProperty({ type: [DictionaryDto] })
  collection: DictionaryDto[];

  @ApiProperty()
  meta: MetaDto;
}
