import React from 'react';
import { useIntl } from 'react-intl';
import { HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { mdiClose } from '@mdi/js';
import { useHistory } from 'react-router-dom';

import { ToggleThemeButton, NavIconButton, NavButton, useGetLinks } from './Navigation';

interface IProps {
  extended: boolean;
  toggle: () => void;
}

const MobileDrawer = ({ toggle, extended }: IProps) => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();
  const background = useColorModeValue('gray.800', 'gray.700');
  const links = useGetLinks();

  return (
    <VStack
      w='250px'
      h='100vh'
      transition='all .25s ease-in-out'
      position='absolute'
      top={0}
      right={0}
      transform={extended ? 'none' : 'translateX(100%)'}
      backgroundColor={background}
    >
      <NavIconButton
        onClick={toggle}
        title={formatMessage({ id: 'close-menu', defaultMessage: 'Close menu' })}
        position='absolute'
        top='16px'
        left='16px'
        path={mdiClose}
        size='sm'
        withoutTooltip
      />
      <VStack justify='space-between' width='100%' height='100%' pb={4} pt={16}>
        <VStack as='ul' pl='14.5px' align='flex-start' width='100%'>
          {links.map(({ label, to, path }) => (
            <HStack key={to} as='li' mb={2}>
              <NavButton onClick={() => push(`/${to}`)} path={path}>
                <Text pl={2} fontWeight='700' fontSize='md'>
                  {label}
                </Text>
              </NavButton>
            </HStack>
          ))}
        </VStack>
        <VStack pl='14.5px' align='flex-start' width='100%'>
          <HStack>
            <ToggleThemeButton extended={extended} fontSize='md' />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export { MobileDrawer };
