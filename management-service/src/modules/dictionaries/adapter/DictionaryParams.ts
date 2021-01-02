import { QueryParams } from 'shared/core';
import { DictionaryType } from '../domain';

export interface DictionaryParams extends QueryParams {
  type: DictionaryType;
}
