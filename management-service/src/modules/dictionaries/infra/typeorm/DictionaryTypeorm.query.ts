import { EntityRepository } from 'typeorm/index';

import { QueryListResult, BaseQuery } from 'shared/core';

import { DictionaryDto } from '../../application/dto';
import { DictionaryParams, DictionaryQuery } from '../../adapter';
import { DictionaryEntity } from './DictionaryTypeorm.entity';

@EntityRepository(DictionaryEntity)
export class DictionaryTypeormQuery
  extends BaseQuery<DictionaryEntity>
  implements DictionaryQuery {
  async getDictionaries({
    query = '',
    offset = 0,
    limit = 50,
    type,
  }: DictionaryParams): Promise<QueryListResult<DictionaryDto>> {
    if (!type) {
      throw new Error('Type query is required');
    }

    const [collection, total] = await this.paginatedQueryBuilder('dictionary', {
      limit,
      offset,
    })
      .where('dictionary.type = :type', { type })
      .andWhere('dictionary.value ilike :query', { query: `%${query}%` })
      .getManyAndCount();

    return {
      collection: collection.map((entity) => ({
        name: entity.name,
        value: entity.value,
      })),
      meta: {
        limit,
        offset,
        total,
      },
    };
  }
}
