import React from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useIntl } from "react-intl";

import { IconButton } from "../../Button";

interface IProps {
  toggle: () => void;
}

const OpenMenuIconButton = ({ toggle }: IProps) => {
  const { formatMessage } = useIntl();

  return (
    <IconButton
      display={{ base: "flex", md: "none" }}
      title={formatMessage({
        defaultMessage: "Open menu",
        id: "open-menu",
      })}
      fontSize="20px"
      color={useColorModeValue("gray.800", "inherit")}
      variant="ghost"
      withoutTooltip
      icon={<HamburgerIcon />}
      onClick={toggle}
    />
  );
};

export { OpenMenuIconButton };
