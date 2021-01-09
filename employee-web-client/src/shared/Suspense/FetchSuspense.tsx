import React, { ReactNode, Suspense } from 'react';

import { Spinner } from 'shared/Spinner';

import { FetchSource, FetchSourceProps } from './FetchSource';

export interface FetchSuspenseProps<Data> extends FetchSourceProps<Data> {
  fallback?: ReactNode;
}

function FetchSuspense<Data>({ fallback = <Spinner margin={32} />, ...restProps }: FetchSuspenseProps<Data>) {
  return (
    <Suspense fallback={fallback}>
      <FetchSource {...restProps} />
    </Suspense>
  );
}

export { FetchSuspense };
