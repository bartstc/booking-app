import React from 'react';
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import { Text, useColorMode, ButtonProps } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';

import { NavButton } from './NavButton';
import { NavIconButton } from './NavIconButton';

interface IProps extends ButtonProps {
  extended: boolean;
}

const ToggleThemeButton = ({ extended, ...props }: IProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { formatMessage } = useIntl();

  const label =
    colorMode === 'light'
      ? formatMessage({ id: 'dark-theme', defaultMessage: 'Dark theme' })
      : formatMessage({ id: 'light-theme', defaultMessage: 'Light theme' });

  const path = colorMode === 'light' ? mdiWeatherNight : mdiWeatherSunny;

  if (isMobile || extended) {
    return (
      <NavButton path={path} onClick={toggleColorMode} {...props}>
        <Text pl={1} fontWeight='700'>
          {label}
        </Text>
      </NavButton>
    );
  }

  return <NavIconButton title={label} path={path} onClick={toggleColorMode} />;
};

export { ToggleThemeButton };
