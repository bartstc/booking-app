import React, { ComponentType, ReactNode } from 'react';
import { ErrorBoundary as Boundary } from 'react-error-boundary';

import { ErrorPageStrategy } from './ErrorPageStrategy';

export interface FallbackProps<ErrorType> {
  error: ErrorType;
  componentStack?: string;
}

export type ErrorFallback<ErrorType> = ComponentType<FallbackProps<ErrorType>>;

interface ErrorBoundaryProps<ErrorType> {
  onError?: (error: Error, componentStack: string) => void | undefined;
  fallback?: ErrorFallback<ErrorType>;
}

export interface IErrorBoundaryProps<ErrorType> extends ErrorBoundaryProps<ErrorType> {
  children: ReactNode;
}

function ErrorBoundary<ErrorType extends Error>({ fallback = ErrorPageStrategy, onError, children }: IErrorBoundaryProps<ErrorType>) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Boundary FallbackComponent={fallback as any} onError={onError as any}>
      {children}
    </Boundary>
  );
}

export { ErrorBoundary };
