import React from "react";
import { Link } from "react-router-dom";
import { HStack, Text, Flex, useColorModeValue } from "@chakra-ui/react";

import { LoginButton } from "modules/auth/presentation";

import { SignUpButton } from "../components";
import { UserMenu } from "./UserMenu";
import { SwitchThemeIconButton } from "./SwitchThemeIconButton";
import { OpenMenuIconButton } from "./OpenMenuIconButton";

interface IProps {
  toggle: () => void;
}

const Header = ({ toggle }: IProps) => {
  const textColor = useColorModeValue("gray.700", "primary.300");
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
      borderBottom="2px solid"
      borderBottomColor={borderColor}
    >
      <Link to="/">
        <Text
          fontWeight="700"
          color={textColor}
          fontSize={{ base: "md", lg: "xl" }}
        >
          Booking App
        </Text>
      </Link>
      <Flex justify="flex-end" align="center" color="gray.400">
        <HStack spacing="5" display={{ base: "none", md: "flex" }}>
          <LoginButton />
          <SignUpButton />
        </HStack>
        <HStack spacing={1}>
          <UserMenu />
          <SwitchThemeIconButton />
          <OpenMenuIconButton toggle={toggle} />
        </HStack>
      </Flex>
    </HStack>
  );
};

export { Header };
