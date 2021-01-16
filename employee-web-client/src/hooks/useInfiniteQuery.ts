import { useInfiniteQuery as useReactInfiniteQuery } from 'react-query';
import { QueryFunction, QueryKey } from 'react-query/types/core/types';
import { UseInfiniteQueryOptions, UseInfiniteQueryResult } from 'react-query/types/react/types';

import { ICollection } from '../types';

export const useInfiniteQuery = <TQueryFnData extends ICollection, TError = unknown, TData = TQueryFnData>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TQueryFnData>,
  options?: UseInfiniteQueryOptions<TQueryFnData, TError, TData>,
  limit = 10,
): UseInfiniteQueryResult<TData, TError> => {
  return useReactInfiniteQuery(queryKey, queryFn, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.collection.length <= 10) {
        return 0;
      }

      const pageNumber = Math.ceil(lastPage.meta.total / limit);
      if (lastPage.meta.total <= limit) return false;
      if (pageNumber === allPages.length) return false;
      return Number(lastPage.meta.offset) + limit;
    },
    ...options,
  });
};
