import React, { Component, ComponentType, Suspense, SuspenseProps } from 'react';

import { TableLoader } from './TableLoader';

export function withTableSuspense<Props>(Wrapper: ComponentType<Props>, props?: Omit<SuspenseProps, 'children'>) {
  // eslint-disable-next-line react/display-name
  return class extends Component<Props> {
    render() {
      return (
        <Suspense fallback={props?.fallback ?? <TableLoader />}>
          <Wrapper {...this.props} />
        </Suspense>
      );
    }
  };
}
