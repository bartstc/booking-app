import React, { ReactNode } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

import { useToggle } from "hooks";

import { Header } from "./Header";
import { SideDrawer } from "./SideDrawer";

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  const background = useColorModeValue("white", "blackAlpha.400");
  const [isOpen, toggle] = useToggle();

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
