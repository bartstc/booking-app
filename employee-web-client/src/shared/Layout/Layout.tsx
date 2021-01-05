import React, { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

import { Drawer } from './Drawer';
import { useToggle } from '../../hooks';

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  const [extended, toggleNavigation] = useToggle();

  return (
    <>
      <Drawer extended={extended} toggle={toggleNavigation} />
      <Flex minH='100vh' transition='all .25s ease-in-out' pl={extended ? '250px' : '70px'}>
        {children}
      </Flex>
    </>
  );
};

export { Layout };
