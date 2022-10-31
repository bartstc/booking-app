import React from 'react';
import { HStack, StackProps } from '@chakra-ui/react';

interface IProps extends StackProps {}

const CollectionPanel = ({ children }: IProps) => {
  return (
    <HStack minH='56px' justify='space-between' w='100%'>
      {children}
    </HStack>
  );
};

export { CollectionPanel };