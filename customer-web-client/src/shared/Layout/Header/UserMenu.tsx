import { useIntl } from "react-intl";
import { isMobile } from "react-device-detect";
import { useHistory } from "react-router-dom";
import {
  mdiAccount,
  mdiLogout,
  mdiWeatherNight,
  mdiWeatherSunny,
} from "@mdi/js";
import {
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
} from "@chakra-ui/react";

import { useAuthContextSelector } from "modules/auth/application";
import { useMemberContextSelector } from "modules/context/application";

import { Icon } from "../../Icon";

const UserMenu = () => {
  const { formatMessage } = useIntl();

  const isAuthenticated = useAuthContextSelector(
    (state) => state.isAuthenticated
  );

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <Menu>
      {isMobile ? <IconButton /> : <Button />}
      <MenuList>
        <MenuGroup
          title={formatMessage({ id: "account", defaultMessage: "Account" })}
        >
          <GoToProfileMenuItem />
          <LogoutMenuItem />
        </MenuGroup>
        <MenuDivider />
        <MenuGroup
          title={formatMessage({ id: "display", defaultMessage: "Display" })}
        >
          <ThemeMenuItem />
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

const Button = () => {
  const memberName = useMemberContextSelector((state) => state.fullName);

  return (
    <MenuButton
      as={ChButton}
      variant="ghost"
      w="100%"
      leftIcon={<Icon path={mdiAccount} size="24px" />}
    >
      <chakra.div pl={1} textAlign="start">
        {memberName}
      </chakra.div>
    </MenuButton>
  );
};

const IconButton = () => (
  <MenuButton
    as={ChIconButton}
    variant="ghost"
    icon={<Icon path={mdiAccount} size="24px" />}
  />
);

const GoToProfileMenuItem = () => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();

  return (
    <MenuItem as={HStack} onClick={() => push("/profile")}>
      <Icon path={mdiAccount} size="18px" />
      <chakra.span>
        {formatMessage({ id: "profile", defaultMessage: "Profile" })}
      </chakra.span>
    </MenuItem>
  );
};

const ThemeMenuItem = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { formatMessage } = useIntl();
  const color = useColorModeValue("yellow.500", "yellow.300");

  const label =
    colorMode === "light"
      ? formatMessage({ id: "dark-theme", defaultMessage: "Dark theme" })
      : formatMessage({ id: "light-theme", defaultMessage: "Light theme" });

  const path = colorMode === "light" ? mdiWeatherNight : mdiWeatherSunny;

  return (
    <MenuItem as={HStack} onClick={toggleColorMode}>
      <Icon path={path} size="20px" color={color} />
      <chakra.span>{label}</chakra.span>
    </MenuItem>
  );
};

const LogoutMenuItem = () => {
  const { formatMessage } = useIntl();
  const logout = useAuthContextSelector((state) => state.logout);

  return (
    <MenuItem as={HStack} onClick={logout}>
      <Icon path={mdiLogout} size="18px" />
      <chakra.span>
        {formatMessage({ id: "logout", defaultMessage: "Logout" })}
      </chakra.span>
    </MenuItem>
  );
};

export { UserMenu };
