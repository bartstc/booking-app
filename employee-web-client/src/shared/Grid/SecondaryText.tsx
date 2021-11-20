import React, { ReactNode } from 'react';
import { chakra, ChakraProps, useColorModeValue } from '@chakra-ui/react';

interface IProps extends ChakraProps {
  children: ReactNode | string;
}

const SecondaryText = ({ children, ...props }: IProps) => {
  const color = useColorModeValue('gray.600', 'gray.400');

  return (
    <chakra.p isTruncated color={color} p={0} m={0} fontSize='xs' {...props}>
      {children}
    </chakra.p>
  );
};

export { SecondaryText };
