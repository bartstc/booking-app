import React, { Component, ComponentType } from 'react';

import { ErrorBoundary, IErrorBoundaryProps } from './ErrorBoundary';

export function withErrorBoundary<Props, ErrorType extends Error>(
  Wrapper: ComponentType<Props>,
  props?: Omit<IErrorBoundaryProps<ErrorType>, 'children'>,
) {
  // eslint-disable-next-line react/display-name
  return class extends Component<Props> {
    render() {
      return (
        <ErrorBoundary fallback={props?.fallback} onError={props?.onError}>
          <Wrapper {...this.props} />
        </ErrorBoundary>
      );
    }
  };
}
