import { Repository, BaseEntity } from 'typeorm/index';

interface PaginationProps {
  limit?: number;
  offset?: number;
}

export class BaseQuery<T extends BaseEntity> extends Repository<T> {
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
