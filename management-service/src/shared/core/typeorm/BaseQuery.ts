import { Repository, BaseEntity } from 'typeorm/index';

interface PaginationProps {
  limit?: number;
  offset?: number;
}

type Order = 'ASC' | 'DESC';

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

  protected extractOrder = (orderKey: string) => {
    const order = orderKey.charAt(0) === '-' ? 'DESC' : 'ASC';
    const sort = order === 'DESC' ? orderKey.substring(1) : orderKey;
    return [sort, order] as [string, Order];
  };
}
