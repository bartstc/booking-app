import React from 'react';
import { useIntl } from 'react-intl';
import { HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { mdiClose, mdiMenu } from '@mdi/js';
import { useHistory, useLocation } from 'react-router-dom';

import { NavButton, ToggleThemeButton, useGetLinks, NavIconButton } from './Navigation';

interface IProps {
  extended: boolean;
  toggle: () => void;
  facilityId?: string;
}

const DesktopDrawer = ({ toggle, extended, facilityId }: IProps) => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  const { pathname } = useLocation();
  const allLinks = useGetLinks();
  const background = useColorModeValue('gray.50', 'gray.700');

  const links = facilityId ? allLinks : [allLinks[0]];

  return (
    <VStack
      w={extended ? '250px' : '60px'}
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
        <VStack as='ul' pl='10px' align='flex-start' width='100%'>
          {links.map(({ label, to, path, signature }) => (
            <HStack key={to} as='li' mb={2}>
              {extended ? (
                <NavButton onClick={() => push(`/${to}`)} path={path} isActive={pathname.includes(signature)}>
                  <Text pl={1} fontWeight='700' fontSize='lg'>
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
