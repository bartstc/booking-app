import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { theme } from './theme';

interface IProps {
  children: ReactNode;
}

const Providers = ({ children }: IProps) => {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <IntlProvider locale='en'>{children}</IntlProvider>
      </ChakraProvider>
    </Router>
  );
};

export { Providers };
