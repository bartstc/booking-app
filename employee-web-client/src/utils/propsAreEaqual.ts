import { PropsWithChildren } from 'react';

import { isEqual } from 'lodash';

export function propsAreEqual<IProps>(propsA: Readonly<PropsWithChildren<IProps>>, propsB: Readonly<PropsWithChildren<IProps>>) {
  if (propsA === propsB) return true;
  return isEqual(propsA, propsB);
}
