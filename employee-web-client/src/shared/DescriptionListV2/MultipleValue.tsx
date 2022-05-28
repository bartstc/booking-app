import React, { ReactNode } from 'react';
import { GridItemProps, StackProps, VStack, GridItem } from '@chakra-ui/react';

import { Value } from './Value';

interface IProps extends GridItemProps {
  children: ReactNode[];
  spacing?: StackProps['spacing'];
}

const MultipleValue = ({ children, spacing = { base: 1, lg: 2 }, ...props }: IProps) => {
  if (children.length === 0) {
    return <Value {...props}>---</Value>;
  }

  return (
    <GridItem as={VStack} colSpan={{ base: 3, lg: 2 }} py={{ base: 0, lg: 2 }} align='flex-start' w='100%' spacing={spacing} {...props}>
      {children}
    </GridItem>
  );
};

export { MultipleValue };
