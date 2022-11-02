import React, { Component, ComponentType, Suspense, SuspenseProps } from 'react';

import { Spinner } from '../Spinner';

export function withSuspense<Props>(Wrapper: ComponentType<Props>, props?: Omit<SuspenseProps, 'children'>) {
  // eslint-disable-next-line react/display-name
  return class extends Component<Props> {
    render() {
      return (
        <Suspense fallback={props?.fallback ?? <Spinner margin={32} mt={10} />}>
          <Wrapper {...this.props} />
        </Suspense>
      );
    }
  };
}
