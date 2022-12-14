import React, { ReactNode } from 'react';
import { VStack } from '@chakra-ui/react';

import { NoResultsState } from '../States';

interface IProps {
  children: ReactNode;
  count: number;
}

const TContainer = ({ children, count }: IProps) => {
  if (count === 0) {
    return <NoResultsState />;
  }

  return (
    <VStack display='stretch' w='100%'>
      {children}
    </VStack>
  );
};

export { TContainer };
