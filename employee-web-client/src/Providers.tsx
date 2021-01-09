import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, useLocation, useHistory } from 'react-router-dom';

import { theme } from './theme';
import { QueryParamsProvider } from './shared/Params';

interface IProps {
  children: ReactNode;
}

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
        <ChakraProvider theme={theme}>
          <IntlProvider locale='en'>{children}</IntlProvider>
        </ChakraProvider>
      </ReactRouterQueryParamsProvider>
    </Router>
  );
};

export { Providers };
