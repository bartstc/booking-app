import React, { ReactNode } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

import { useToggle } from "hooks";
import { useAuthContextSelector } from "modules/auth/application";
import { Context } from "modules/context";

import { Header } from "./Header";
import { SideDrawer } from "./SideDrawer";

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  const isAuthenticated = useAuthContextSelector(
    (state) => state.isAuthenticated
  );

  const background = useColorModeValue("white", "blackAlpha.400");
  const [isOpen, toggle] = useToggle();

  if (isAuthenticated()) {
    return (
      <Context>
        <Box
          w="100%"
          background={background}
          minH="100vh"
          pt={{ base: "50px", lg: "70px" }}
        >
          <SideDrawer isOpen={isOpen} toggle={toggle} />
          <Header toggle={toggle} />
          {children}
        </Box>
      </Context>
    );
  }

  return (
    <Box
      w="100%"
      background={background}
      minH="100vh"
      pt={{ base: "50px", lg: "70px" }}
    >
      <SideDrawer isOpen={isOpen} toggle={toggle} />
      <Header toggle={toggle} />
      {children}
    </Box>
  );
};

export { Layout };
