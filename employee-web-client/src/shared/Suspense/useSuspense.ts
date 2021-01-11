import { QueryObserverBaseResult, useQuery } from 'react-query';
import { QueryFunction, QueryKey } from 'react-query/types/core/types';
import { UseQueryOptions } from 'react-query/types/react/types';

export interface QueryResult<Data> extends Omit<QueryObserverBaseResult<Data, Error>, 'data'> {
  data: Data;
}

export const useSuspense = <Data>(queryKey: QueryKey, queryFn: QueryFunction<Data>, options?: UseQueryOptions): QueryResult<Data> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return useQuery(queryKey, queryFn, {
    suspense: true,
    ...options,
  }) as QueryFunction<Data>;
};
