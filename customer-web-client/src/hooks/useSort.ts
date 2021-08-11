import { useQueryParams } from 'shared/Params';

export enum SortingType {
  DEFAULT = 'default',
  ASC = 'asc',
  DESC = 'desc',
}

export const useSort = (name: string, key = 'order') => {
  const { params, change, remove } = useQueryParams<{ [k: string]: string }>();
  const order = params[key];

  const getSortType = (): SortingType => {
    if (!order) {
      return SortingType.DEFAULT;
    }

    if (order.charAt(0) === '-' && order.includes(name)) {
      return SortingType.DESC;
    }

    if (order === name) {
      return SortingType.ASC;
    }

    return SortingType.DEFAULT;
  };

  const getNextOrderType = (sortType: SortingType, name: string): string => {
    switch (sortType) {
      case SortingType.ASC:
        return `-${name}`;
      case SortingType.DESC:
        return '';
      case SortingType.DEFAULT:
        return name;
    }
  };

  const currentSortType = getSortType();
  const nextOrder = getNextOrderType(currentSortType, name);

  return {
    currentSortType,
    nextOrder,
    change: nextOrder ? () => change(key, nextOrder) : () => remove(key),
  };
};
