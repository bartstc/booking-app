/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { SuspenseFallback } from './SuspenseFallback';

// eslint-disable-next-line react/display-name
export const withSuspense = () => (story: any) => {
  return <SuspenseFallback>{story()}</SuspenseFallback>;
};
