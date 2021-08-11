import React from 'react';

import { FetchSuspense, FetchSuspenseProps } from './FetchSuspense';
import { ErrorBoundary, ErrorPageStrategy } from '../ErrorBoundary';

function FetchBoundary<Data>({ errorFallback = ErrorPageStrategy, ...restProps }: FetchSuspenseProps<Data>) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <FetchSuspense {...restProps} />
    </ErrorBoundary>
  );
}

export { FetchBoundary };
