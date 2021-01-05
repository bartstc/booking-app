import React from 'react';
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import { useColorMode } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

import { DrawerButton } from './DrawerButton';
import { DrawerIconButton } from './DrawerIconButton';

interface IProps {
  extended: boolean;
}

const ToggleThemeButton = ({ extended }: IProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { formatMessage } = useIntl();

  const label =
    colorMode === 'light'
      ? formatMessage({ id: 'dark-theme', defaultMessage: 'Dark theme' })
      : formatMessage({ id: 'light-theme', defaultMessage: 'Light theme' });

  const path = colorMode === 'light' ? mdiWeatherNight : mdiWeatherSunny;

  if (extended) {
    return (
      <DrawerButton path={path} onClick={toggleColorMode}>
        {label}
      </DrawerButton>
    );
  }

  return <DrawerIconButton title={label} path={path} onClick={toggleColorMode} />;
};

export { ToggleThemeButton };
