import React from 'react';
import { VStack, StackProps } from '@chakra-ui/react';

interface IProps extends StackProps {}

const CollectionContainer = ({ children, ...props }: IProps) => {
  return (
    <VStack w='100%' pb={{ base: 4, md: 10 }} {...props}>
      {children}
    </VStack>
  );
};

export { CollectionContainer };
