import React, { ReactNode, Suspense, useEffect } from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { useHistory, useLocation, BrowserRouter } from 'react-router-dom';

import { QueryParamsProvider } from '../shared/Params';
import { theme } from '../theme';

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
  log: console.log,
  warn: console.warn,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  error: () => {},
});

type Options = {
  route?: string;
};

const Providers = ({ children, route }: Options & { children: ReactNode }) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (route) {
      history.push(route);
    }
  }, []);

  return (
    <QueryParamsProvider location={location} history={history}>
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
