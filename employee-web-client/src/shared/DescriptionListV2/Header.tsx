import React from 'react';
import { VStack, StackProps } from '@chakra-ui/react';

interface IProps extends StackProps {}

const Header = ({ children, ...props }: IProps) => {
  return (
    <VStack display='stretch' w='100%' spacing={1} pb={{ base: 2, lg: 4 }} {...props}>
      {children}
    </VStack>
  );
};

export { Header };
