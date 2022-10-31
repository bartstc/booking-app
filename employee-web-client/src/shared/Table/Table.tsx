import React from 'react';
import { Table as ChakraTable, TableProps } from '@chakra-ui/react';

interface IProps extends TableProps {}

const Table = ({ children, ...props }: IProps) => {
  return (
    <ChakraTable {...props} fontSize={{ base: 'xs', lg: 'sm' }}>
      {children}
    </ChakraTable>
  );
};

export { Table };
