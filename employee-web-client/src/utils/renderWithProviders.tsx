import React, { ReactNode, Suspense, useEffect } from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { useNavigate, useLocation, BrowserRouter, NavigateOptions } from 'react-router-dom';

import { QueryParamsProvider } from '../shared/Params';
import { theme } from './theme';

// https://github.com/TkDodo/testing-react-query/tree/main/src/tests
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

setLogger({
  // eslint-disable-next-line no-console
  log: console.log,
  // eslint-disable-next-line no-console
  warn: console.warn,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  error: () => {},
});

type Options = {
  route?: string;
};

const Providers = ({ children, route }: Options & { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (route) {
      navigate(route);
    }
  }, []);

  return (
    <QueryParamsProvider
      location={location}
      history={{
        push: navigate,
        replace: (to: string, options?: NavigateOptions) => navigate(to, { replace: true, ...options }),
      }}
    >
      <ChakraProvider theme={theme}>
        <IntlProvider locale='en'>{children}</IntlProvider>
      </ChakraProvider>
    </QueryParamsProvider>
  );
};

export function renderWithProviders(ui: React.ReactElement, options: Options = {}) {
  const testQueryClient = createTestQueryClient();

  const { rerender, ...result } = render(
    <BrowserRouter>
      <Providers {...options}>
        <Suspense fallback={() => <div>Loading...</div>}>
          <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
        </Suspense>
      </Providers>
    </BrowserRouter>,
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <BrowserRouter>
          <Providers {...options}>
            <Suspense fallback={() => <div>Loading...</div>}>
              <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
            </Suspense>
          </Providers>
        </BrowserRouter>,
      ),
  };
}
