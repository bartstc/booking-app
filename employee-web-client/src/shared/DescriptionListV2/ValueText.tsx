import React, { ReactNode } from 'react';
import { Text } from '@chakra-ui/react';

interface IProps {
  children: ReactNode;
}

const ValueText = ({ children }: IProps) => {
  return (
    <Text fontSize='md' whiteSpace='pre-line' w='100%' m={0}>
      {children}
    </Text>
  );
};

export { ValueText };
