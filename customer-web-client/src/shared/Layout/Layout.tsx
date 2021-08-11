import React, { ReactNode } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  const background = useColorModeValue('white', 'blackAlpha.400');

  return (
    <Box w='100%' background={background} minH='100vh'>
      {children}
    </Box>
  );
};

export { Layout };
