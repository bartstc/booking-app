import { QueryListResult } from 'shared/core';
import { DictionaryDto } from '../application/dto';
import { DictionaryParams } from './DictionaryParams';

export interface DictionaryQuery {
  getDictionaries(
    params: DictionaryParams,
  ): Promise<QueryListResult<DictionaryDto>>;
}
