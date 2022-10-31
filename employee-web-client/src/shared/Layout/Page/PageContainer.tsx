import React, { ReactNode } from 'react';
import { VStack, StackProps } from '@chakra-ui/react';

interface IProps extends StackProps {
  children: ReactNode;
}

const PageContainer = ({ children, ...props }: IProps) => {
  return (
    <VStack
      spacing={{ base: 10, md: 16 }}
      w='100%'
      mt={{ base: 4, md: 10 }}
      px={{ base: 4, md: 8 }}
      pb={4}
      maxW='1500px'
      margin='0 auto'
      {...props}
    >
      {children}
    </VStack>
  );
};

export { PageContainer };
