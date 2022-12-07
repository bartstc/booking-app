import React, { ReactNode } from 'react';

import { GridItem, GridItemProps } from '@chakra-ui/react';

interface IProps extends GridItemProps {
  children: ReactNode;
}

const ListItem = ({ children, ...props }: IProps) => {
  return (
    <GridItem colStart={1} colEnd={-1} {...props}>
      {children}
    </GridItem>
  );
};

export { ListItem };
