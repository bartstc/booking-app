import React from 'react';
import { StackProps, VStack } from '@chakra-ui/react';

interface IProps extends StackProps {}

const SectionContainer = ({ children, ...props }: IProps) => {
  return (
    <VStack w='100%' display='stretch' spacing={{ base: 6, lg: 10 }} pb={8} {...props}>
      {children}
    </VStack>
  );
};

export { SectionContainer };
