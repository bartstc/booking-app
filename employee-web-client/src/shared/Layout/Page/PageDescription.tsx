import React from 'react';
import { VStack, StackProps } from '@chakra-ui/react';

interface IProps extends StackProps {}

const PageDescription = ({ children, ...props }: IProps) => {
  return (
    <VStack as='header' align='flex-start' {...props}>
      {children}
    </VStack>
  );
};

export { PageDescription };
