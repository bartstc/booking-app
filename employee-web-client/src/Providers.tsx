import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, useLocation, useHistory } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { theme } from './theme';
import { QueryParamsProvider } from './shared/Params';
import { AuthProvider, authService } from './modules/auth/application';

interface IProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ReactRouterQueryParamsProvider = ({ children }: { children: ReactNode }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <QueryParamsProvider location={location} history={history}>
      {children}
    </QueryParamsProvider>
  );
};

const Providers = ({ children }: IProps) => {
  return (
    <Router>
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
    </Router>
  );
};

export { Providers };
