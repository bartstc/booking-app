/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

// eslint-disable-next-line react/display-name
export const withReactQuery = () => (story: any) => {
  return <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>;
};
