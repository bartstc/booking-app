/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// https://github.com/TkDodo/testing-react-query/tree/main/src/tests
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// eslint-disable-next-line react/display-name
export const withReactQuery = () => (story: any) => {
  const queryClient = createTestQueryClient();

  return <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>;
};
