import React from 'react';
import { useIntl } from 'react-intl';
import { HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { mdiClose, mdiMenu } from '@mdi/js';
import { useHistory, useLocation } from 'react-router-dom';

import { NavButton, ToggleThemeButton, useGetLinks, NavIconButton } from './Navigation';

interface IProps {
  extended: boolean;
  toggle: () => void;
}

const DesktopDrawer = ({ toggle, extended }: IProps) => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  const { pathname } = useLocation();
  const links = useGetLinks();
  const background = useColorModeValue('white', 'blackAlpha.300');

  return (
    <VStack
      w={extended ? '240px' : '60px'}
      h='100vh'
      transition='all .25s ease-in-out'
      position='fixed'
      backgroundColor={background}
      overflow='hidden'
      zIndex={5}
    >
      <NavIconButton
        onClick={toggle}
        title={formatMessage({ id: 'toggle-menu', defaultMessage: 'Toggle menu' })}
        position='absolute'
        top='15px'
        left='10px'
        path={extended ? mdiClose : mdiMenu}
      />
      <VStack justify='space-between' width='100%' height='100%' pb={10} pt={20}>
        <VStack spacing={3} as='ul' px='10px' align='flex-start' width='100%'>
          {links.map(({ label, to, path, signature }) => (
            <HStack w='100%' key={to} as='li'>
              {extended ? (
                <NavButton onClick={() => push(`/${to}`)} path={path} isActive={pathname.includes(signature)}>
                  <Text pl={2} fontWeight='400' lineHeight='100%'>
                    {label}
                  </Text>
                </NavButton>
              ) : (
                <NavIconButton onClick={() => push(`/${to}`)} title={label} path={path} isActive={pathname.includes(signature)} />
              )}
            </HStack>
          ))}
        </VStack>
        <VStack pl='10px' align='flex-start' width='100%'>
          <HStack>
            <ToggleThemeButton extended={extended} />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export { DesktopDrawer };
