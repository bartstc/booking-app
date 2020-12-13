import { Repository } from 'typeorm/index';

import { AbstractEntity } from './AbstractEntity';

interface PaginationProps {
  limit?: number;
  offset?: number;
}

export class BaseQuery<T extends AbstractEntity> extends Repository<T> {
  protected paginatedQueryBuilder = (
    alias: string,
    { limit, offset }: PaginationProps,
  ) => {
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset);

    return this.createQueryBuilder(alias)
      .take(Number.isFinite(parsedLimit) ? parsedLimit : 10)
      .skip(Number.isFinite(parsedOffset) ? parsedOffset : 0);
  };
}
