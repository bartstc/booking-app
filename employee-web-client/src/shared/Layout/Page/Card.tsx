import React, { ReactNode } from 'react';
import { ChakraProps, chakra, useColorModeValue } from '@chakra-ui/react';

interface IProps extends ChakraProps {
  children: ReactNode;
}

const Card = ({ children, ...props }: IProps) => {
  const background = useColorModeValue('white', 'blackAlpha.300');

  return (
    <chakra.div w='100%' backgroundColor={background} p={8} borderRadius={10} {...props}>
      {children}
    </chakra.div>
  );
};

export { Card };
