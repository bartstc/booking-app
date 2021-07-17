import React from 'react';
import { useIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
import { mdiAccount, mdiLogout, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import {
  Avatar,
  Button as ChButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  IconButton as ChIconButton,
  HStack,
  useColorMode,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';

import { useAuthContextSelector } from 'modules/auth/application';

import { Icon } from '../Icon';
import { useEmployeeContextSelector } from '../../modules/context';

interface IProps {
  extended: boolean;
}

const UserMenu = ({ extended }: IProps) => {
  const { formatMessage } = useIntl();

  return (
    <Menu>
      {isMobile ? <Button /> : extended ? <Button /> : <IconButton />}
      <MenuList>
        <MenuGroup title={formatMessage({ id: 'account', defaultMessage: 'Account' })}>
          <MenuItem as={HStack}>
            <Icon path={mdiAccount} size='18px' />
            <chakra.span>{formatMessage({ id: 'profile', defaultMessage: 'Profile' })}</chakra.span>
          </MenuItem>
          <LogoutMenuItem />
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title={formatMessage({ id: 'display', defaultMessage: 'Display' })}>
          <ThemeMenuItem />
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

const Button = () => {
  const employeeName = useEmployeeContextSelector(state => state.name);

  return (
    <MenuButton as={ChButton} variant='ghost' w='100%' leftIcon={<Avatar size='sm' mr={2} />}>
      {employeeName}
    </MenuButton>
  );
};

const IconButton = () => <MenuButton as={ChIconButton} variant='ghost' icon={<Avatar size='sm' />} />;

const ThemeMenuItem = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { formatMessage } = useIntl();
  const color = useColorModeValue('yellow.500', 'yellow.300');

  const label =
    colorMode === 'light'
      ? formatMessage({ id: 'dark-theme', defaultMessage: 'Dark theme' })
      : formatMessage({ id: 'light-theme', defaultMessage: 'Light theme' });

  const path = colorMode === 'light' ? mdiWeatherNight : mdiWeatherSunny;

  return (
    <MenuItem as={HStack} onClick={toggleColorMode}>
      <Icon path={path} size='20px' color={color} />
      <chakra.span>{label}</chakra.span>
    </MenuItem>
  );
};

const LogoutMenuItem = () => {
  const { formatMessage } = useIntl();
  const logout = useAuthContextSelector(state => state.logout);

  return (
    <MenuItem as={HStack} onClick={logout}>
      <Icon path={mdiLogout} size='18px' />
      <chakra.span>{formatMessage({ id: 'logout', defaultMessage: 'Logout' })}</chakra.span>
    </MenuItem>
  );
};

export { UserMenu };
