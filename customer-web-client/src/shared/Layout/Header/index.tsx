import React from "react";
import { useIntl } from "react-intl";
import {
  HStack,
  Text,
  Flex,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";

import { IconButton } from "shared/Button";
import { SignInButton, SignUpButton } from "../components";

interface IProps {
  toggle: () => void;
}

const Header = ({ toggle }: IProps) => {
  const { formatMessage } = useIntl();

  const { toggleColorMode: toggleMode, colorMode } = useColorMode();
  const textColor = useColorModeValue("gray.700", "primary.300");
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const bg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.100", "gray.800");

  return (
    <HStack
      position="fixed"
      height={{ base: "50px", lg: "70px" }}
      px={3}
      top={0}
      left={0}
      right={0}
      justify="space-between"
      zIndex={5}
      background={bg}
      borderTop="5px solid"
      borderTopColor="primary.400"
      w="full"
      overflowY="hidden"
      borderBottom="2px solid"
      borderBottomColor={borderColor}
    >
      <Text
        fontWeight="700"
        color={textColor}
        fontSize={{ base: "md", lg: "xl" }}
      >
        Booking App
      </Text>
      <Flex justify="flex-end" align="center" color="gray.400">
        <HStack spacing="5" display={{ base: "none", md: "flex" }}>
          <SignInButton />
          <SignUpButton />
        </HStack>
        <HStack spacing={1}>
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
        </HStack>
      </Flex>
    </HStack>
  );
};

export { Header };
