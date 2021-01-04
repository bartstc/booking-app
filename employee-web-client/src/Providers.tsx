import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { ChakraProvider } from '@chakra-ui/react';

interface IProps {
  children: ReactNode;
}

const Providers = ({ children }: IProps) => {
  return (
    <ChakraProvider>
      <IntlProvider locale='en'>{children}</IntlProvider>
    </ChakraProvider>
  );
};

export { Providers };
