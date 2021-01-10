import React from 'react';
import {
  HStack,
  Text,
  useColorModeValue,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { ToggleThemeButton, NavButton, useGetLinks } from './Navigation';

interface IProps {
  extended: boolean;
  toggle: () => void;
}

const MobileDrawer = ({ toggle, extended }: IProps) => {
  const { push } = useHistory();
  const background = useColorModeValue('gray.500', 'gray.700');
  const links = useGetLinks();

  return (
    <Drawer isOpen={extended} placement='right' onClose={toggle} size='xs'>
      <DrawerOverlay>
        <DrawerContent backgroundColor={background}>
          <DrawerCloseButton />
          <DrawerBody as={VStack} justify='space-between' width='100%' height='100%' pb={4} pt={16}>
            <VStack as='ul' align='flex-start' width='100%'>
              {links.map(({ label, to, path }) => (
                <HStack key={to} as='li'>
                  <NavButton onClick={() => push(`/${to}`)} path={path}>
                    <Text pl={2} fontWeight='700' fontSize='md'>
                      {label}
                    </Text>
                  </NavButton>
                </HStack>
              ))}
            </VStack>
            <VStack align='flex-start' width='100%'>
              <HStack>
                <ToggleThemeButton extended={extended} fontSize='md' />
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export { MobileDrawer };
