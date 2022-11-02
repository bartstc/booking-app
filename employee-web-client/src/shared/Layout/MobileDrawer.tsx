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
import { useNavigate, useLocation } from 'react-router-dom';

import { NavButton, useGetLinks } from './Navigation';
import { UserMenu } from './UserMenu';
import { ScopeMenu } from './ScopeMenu';

interface IProps {
  extended: boolean;
  toggle: () => void;
}

const MobileDrawer = ({ toggle, extended }: IProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const background = useColorModeValue('white', 'gray.800');
  const links = useGetLinks();

  return (
    <Drawer isOpen={extended} placement='right' onClose={toggle} size='xs'>
      <DrawerOverlay>
        <DrawerContent backgroundColor={background}>
          <DrawerCloseButton />
          <DrawerBody as={VStack} justify='space-between' width='100%' height='100%' pb={4} pt={16}>
            <VStack as='ul' spacing={2} align='flex-start' width='100%'>
              {links.map(({ label, to, path, signature }) => {
                const isActive = pathname.includes(signature);

                return (
                  <HStack w='100%' key={to} as='li'>
                    <NavButton onClick={isActive ? undefined : () => navigate(`/${to}`)} path={path} isActive={isActive}>
                      <Text pl={2} fontWeight='700' fontSize='md'>
                        {label}
                      </Text>
                    </NavButton>
                  </HStack>
                );
              })}
            </VStack>
            <VStack align='flex-start' width='100%'>
              <VStack align='flex-start' w='100%'>
                <ScopeMenu extended={extended} />
                <UserMenu extended={extended} />
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export { MobileDrawer };
