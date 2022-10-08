import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, NavigateOptions, useLocation, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { theme } from '../theme';
import { QueryParamsProvider } from '../shared/Params';
import { AuthProvider, authService } from '../modules/auth/application';

interface IProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ReactRouterQueryParamsProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <QueryParamsProvider
      location={location}
      history={{
        push: navigate,
        replace: (to: string, options?: NavigateOptions) => navigate(to, { replace: true, ...options }),
      }}
    >
      {children}
    </QueryParamsProvider>
  );
};

const Providers = ({ children }: IProps) => {
  return (
    <BrowserRouter>
      <ReactRouterQueryParamsProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <IntlProvider locale='en'>
              {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
              <AuthProvider value={authService}>{children}</AuthProvider>
            </IntlProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </ReactRouterQueryParamsProvider>
    </BrowserRouter>
  );
};

export { Providers };
