import React, { ReactNode } from 'react';

import { GridItem, GridItemProps } from '@chakra-ui/react';

interface IProps extends GridItemProps {
  children: ReactNode;
}

const ListStack = ({ children, ...props }: IProps) => {
  return (
    <GridItem colSpan={3} {...props}>
      {children}
    </GridItem>
  );
};

export { ListStack };
