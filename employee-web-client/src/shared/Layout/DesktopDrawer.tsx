import React from 'react';
import { useIntl } from 'react-intl';
import { HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { mdiClose, mdiMenu } from '@mdi/js';
import { useHistory } from 'react-router-dom';

import { NavButton, ToggleThemeButton, useGetLinks, NavIconButton } from './Navigation';

interface IProps {
  extended: boolean;
  toggle: () => void;
}

const DesktopDrawer = ({ toggle, extended }: IProps) => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  const links = useGetLinks();
  const background = useColorModeValue('gray.800', 'gray.700');

  return (
    <VStack
      w={extended ? '250px' : '70px'}
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
        top='16px'
        right='16px'
        path={extended ? mdiClose : mdiMenu}
      />
      <VStack justify='space-between' width='100%' height='100%' pb={10} pt={20}>
        <VStack as='ul' pl='14.5px' align='flex-start' width='100%'>
          {links.map(({ label, to, path }) => (
            <HStack key={to} as='li' mb={4}>
              {extended ? (
                <NavButton onClick={() => push(`/${to}`)} path={path}>
                  <Text pl={2} fontWeight='700' fontSize='xl'>
                    {label}
                  </Text>
                </NavButton>
              ) : (
                <NavIconButton onClick={() => push(`/${to}`)} title={label} path={path} />
              )}
            </HStack>
          ))}
        </VStack>
        <VStack pl='14.5px' align='flex-start' width='100%'>
          <HStack>
            <ToggleThemeButton extended={extended} />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export { DesktopDrawer };
