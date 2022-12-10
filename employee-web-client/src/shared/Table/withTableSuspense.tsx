import React, { Component, ComponentType, Suspense, SuspenseProps } from 'react';

import { TLoader } from './TLoader';

export function withTableSuspense<Props>(Wrapper: ComponentType<Props>, props?: Omit<SuspenseProps, 'children'>) {
  // eslint-disable-next-line react/display-name
  return class extends Component<Props> {
    render() {
      return (
        <Suspense fallback={props?.fallback ?? <TLoader />}>
          <Wrapper {...this.props} />
        </Suspense>
      );
    }
  };
}
