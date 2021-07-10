import React from 'react';
import { useIntl } from 'react-intl';
import { HStack, Text, useColorModeValue, VStack, useTheme } from '@chakra-ui/react';
import { mdiClose, mdiMenu } from '@mdi/js';
import { useHistory, useLocation } from 'react-router-dom';

import { NavButton, useGetLinks, NavIconButton } from './Navigation';
import { UserMenu } from './UserMenu';

interface IProps {
  extended: boolean;
  toggle: () => void;
}

const DesktopDrawer = ({ toggle, extended }: IProps) => {
  const { formatMessage } = useIntl();
  const { colors } = useTheme();
  const { push } = useHistory();
  const { pathname } = useLocation();
  const links = useGetLinks();
  const background = useColorModeValue('white', '#141821');
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[800]);

  return (
    <VStack
      w={extended ? '255px' : '80px'}
      h='100vh'
      transition='all .25s ease-in-out'
      position='fixed'
      backgroundColor={background}
      zIndex={5}
      borderRight={`2px solid ${borderColor}`}
    >
      <NavIconButton
        onClick={toggle}
        title={formatMessage({ id: 'toggle-menu', defaultMessage: 'Toggle menu' })}
        position='absolute'
        top='15px'
        left='20px'
        path={extended ? mdiClose : mdiMenu}
      />
      <VStack justify='space-between' width='100%' height='100%' pb={10} pt={20}>
        <VStack spacing={4} as='ul' px='20px' align='flex-start' width='100%' overflow='hidden'>
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
        <VStack pl='20px' align='flex-start' width='100%'>
          <HStack>
            <UserMenu extended={extended} />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export { DesktopDrawer };
