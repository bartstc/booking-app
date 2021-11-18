import React from "react";
import { useIntl } from "react-intl";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { useAuthContextSelector } from "modules/auth/application";

import { IconButton } from "../../Button";

const SwitchThemeIconButton = () => {
  const { formatMessage } = useIntl();

  const { toggleColorMode: toggleMode, colorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  const isAuthenticated = useAuthContextSelector(
    (state) => state.isAuthenticated
  );

  if (isAuthenticated()) {
    return null;
  }

  return (
    <IconButton
      size="md"
      fontSize="lg"
      title={
        colorMode === "light"
          ? formatMessage({
              id: "switch-to-dark",
              defaultMessage: "Switch to dark mode",
            })
          : formatMessage({
              id: "switch-to-light",
              defaultMessage: "Switch to light mode",
            })
      }
      variant="ghost"
      color="current"
      ml={{ base: "0", md: "3" }}
      onClick={toggleMode}
      icon={<SwitchIcon />}
      withoutTooltip
    />
  );
};

export { SwitchThemeIconButton };
