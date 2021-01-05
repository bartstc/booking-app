import React, { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

import { Drawer } from './Drawer';

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <Flex minH='100vh'>
      <Drawer />
      {children}
    </Flex>
  );
};

export { Layout };
