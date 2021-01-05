import React from 'react';
import { mdiAccountMultiple, mdiBookMultiple, mdiCalendar, mdiClose, mdiCogs, mdiLan, mdiMenu } from '@mdi/js';
import { HStack, useColorModeValue, VStack } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

import { DrawerIconButton } from './DrawerIconButton';
import { DrawerButton } from './DrawerButton';
import { ToggleThemeButton } from './ToggleThemeButton';

interface IProps {
  extended: boolean;
  toggle: () => void;
}

const Drawer = ({ extended, toggle }: IProps) => {
  const { formatMessage } = useIntl();

  const links = [
    {
      path: mdiCalendar,
      label: formatMessage({
        id: 'schedule',
        defaultMessage: 'Schedule',
      }),
      to: 'schedule',
    },
    {
      path: mdiAccountMultiple,
      label: formatMessage({
        id: 'customers',
        defaultMessage: 'Customers',
      }),
      to: 'customers',
    },

    {
      path: mdiLan,
      label: formatMessage({
        id: 'employees',
        defaultMessage: 'Employees',
      }),
      to: 'employees',
    },
    {
      path: mdiBookMultiple,
      label: formatMessage({
        id: 'offers',
        defaultMessage: 'Offers',
      }),
      to: 'offers',
    },
    {
      path: mdiCogs,
      label: formatMessage({
        id: 'settings',
        defaultMessage: 'Settings',
      }),
      to: 'settings',
    },
  ];

  const background = useColorModeValue('gray.800', 'gray.700');
  return (
    <VStack
      w={extended ? '250px' : '70px'}
      h='100vh'
      transition='all .25s ease-in-out'
      position='fixed'
      backgroundColor={background}
      overflow='hidden'
    >
      <DrawerIconButton
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
              {extended ? <DrawerButton path={path}>{label}</DrawerButton> : <DrawerIconButton title={label} path={path} />}
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

export { Drawer };
