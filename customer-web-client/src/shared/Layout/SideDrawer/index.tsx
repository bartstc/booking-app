import React from "react";
import {
  HStack,
  useColorModeValue,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import { LoginButton } from "modules/auth/presentation";

import { SignUpButton } from "../components";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
}

const SideDrawer = ({ toggle, isOpen }: IProps) => {
  const background = useColorModeValue("white", "gray.800");

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={toggle} size="xs">
      <DrawerOverlay>
        <DrawerContent backgroundColor={background}>
          <DrawerCloseButton />
          <DrawerBody
            as={VStack}
            justify="space-between"
            width="100%"
            height="100%"
            pb={4}
            pt={16}
          >
            <HStack w="full" spacing={3} align="flex-end">
              <LoginButton />
              <SignUpButton />
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export { SideDrawer };
