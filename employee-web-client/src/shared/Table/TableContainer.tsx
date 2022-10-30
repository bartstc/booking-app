import React, { ReactNode } from 'react';
import { VStack } from '@chakra-ui/react';

interface IProps {
  children: ReactNode;
}

const TableContainer = ({ children }: IProps) => {
  return (
    <VStack display='stretch' w='100%' fontSize='sm'>
      {children}
    </VStack>
  );
};

export { TableContainer };
