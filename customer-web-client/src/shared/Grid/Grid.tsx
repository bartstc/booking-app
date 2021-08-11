import React, { ReactNode } from 'react';
import { Grid as ChakraGrid, GridProps } from '@chakra-ui/react';

import { NoResultsState } from '../States';

interface IProps extends GridProps {
  itemsCount: number;
  children: ReactNode | string;
}

const Grid = ({ children, itemsCount, ...props }: IProps) => {
  if (itemsCount === 0) {
    return <NoResultsState />;
  }

  return (
    <ChakraGrid w='100%' {...props}>
      {children}
    </ChakraGrid>
  );
};

export { Grid };
