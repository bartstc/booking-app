import React, { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';

import { useToggle } from 'hooks';
import { Context } from 'modules/context';

import { DesktopDrawer } from './DesktopDrawer';
import { MobileDrawer } from './MobileDrawer';
import { Header } from './Header';

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  const [extended, toggleNavigation] = useToggle();

  if (isMobile) {
    return (
      <Context>
        {(enterprise, facility) => {
          return (
            <Flex minH='100vh' position='relative' overflow='hidden' pt={{ base: 16, md: 10, xl: 0 }}>
              <Header toggle={toggleNavigation} />
              {children}
              <MobileDrawer extended={extended} toggle={toggleNavigation} facilityId={facility?.facilityId} />
            </Flex>
          );
        }}
      </Context>
    );
  }

  return (
    <Context>
      {(enterprise, facility) => {
        return (
          <>
            <DesktopDrawer extended={extended} toggle={toggleNavigation} facilityId={facility?.facilityId} />
            <Flex minH='100vh' transition='all .25s ease-in-out' pl={!isMobile && extended ? '250px' : '70px'} position='relative'>
              {children}
            </Flex>
          </>
        );
      }}
    </Context>
  );
};

export { Layout };
