import React, { ReactNode, Suspense } from 'react';

export const SuspenseFallback = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<strong>Loading...</strong>}>{children}</Suspense>;
};
