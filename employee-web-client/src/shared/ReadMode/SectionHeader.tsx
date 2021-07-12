import React from 'react';
import { VStack, StackProps } from '@chakra-ui/react';

interface IProps extends StackProps {}

const SectionHeader = ({ children, ...props }: IProps) => {
  return (
    <VStack display='stretch' w='100%' spacing={1} {...props}>
      {children}
    </VStack>
  );
};

export { SectionHeader };
