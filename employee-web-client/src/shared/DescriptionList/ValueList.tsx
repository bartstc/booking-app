import React, { ReactNode } from 'react';
import { VStack } from '@chakra-ui/react';

interface IProps {
  children: ReactNode;
}

const ValueList = ({ children }: IProps) => {
  return (
    <VStack spacing={4} align='flex-start' w='100%'>
      {children}
    </VStack>
  );
};

export { ValueList };
