import React, { ReactNode } from 'react';
import { UseQueryOptions } from 'react-query/types/react/types';
import { QueryFunction, QueryKey } from 'react-query/types/core/types';

import { QueryResult, useSuspense } from './useSuspense';
import { ErrorFallback } from '../ErrorBoundary/ErrorBoundary';
import { ClientErrorState } from '../States';

type ChildrenFn<Data> = (data: QueryResult<Data>) => ReactNode;

export interface FetchSourceProps<Data> {
  queryKey: QueryKey;
  children: ReactNode | ChildrenFn<Data>;
  options?: UseQueryOptions;
  queryFn: QueryFunction<Data>;
  errorFallback?: ErrorFallback<Error>;
}

function FetchSource<Data>({ children, options, queryFn, queryKey, errorFallback = () => <ClientErrorState /> }: FetchSourceProps<Data>) {
  const result = useSuspense<Data>(queryKey, queryFn, options);

  if (result.error) {
    const ErrorFallback = errorFallback;
    return <ErrorFallback error={result.error} />;
  }

  if (typeof children === 'function') {
    return children(result);
  }

  return children;
}

export { FetchSource };
