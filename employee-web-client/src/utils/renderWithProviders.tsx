import React, { ReactNode, Suspense } from 'react';
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

const Providers = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (route) {
  //     navigate(route);
  //   }
  // }, []);

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

export function renderWithProviders(ui: React.ReactElement, options: Options = { route: '/' }) {
  window.history.pushState({}, 'Test page', options.route);
  const testQueryClient = createTestQueryClient();

  const { rerender, ...result } = render(
    <Providers>
      <Suspense fallback={() => <div>Loading...</div>}>
        <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
      </Suspense>
    </Providers>,
    { wrapper: BrowserRouter },
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <Providers>
          <Suspense fallback={() => <div>Loading...</div>}>
            <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
          </Suspense>
        </Providers>,
      ),
  };
}
