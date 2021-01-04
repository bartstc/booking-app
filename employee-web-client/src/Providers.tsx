import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from './theme';

interface IProps {
  children: ReactNode;
}

const Providers = ({ children }: IProps) => {
  return (
    <ChakraProvider theme={theme}>
      <IntlProvider locale='en'>{children}</IntlProvider>
    </ChakraProvider>
  );
};

export { Providers };
