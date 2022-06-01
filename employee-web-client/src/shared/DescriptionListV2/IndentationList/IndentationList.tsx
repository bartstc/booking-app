import React, { ReactNode } from 'react';
import { SimpleGridProps } from '@chakra-ui/react';

import { List } from '../List';
import { ListItem } from '../ListItem';

interface IProps extends SimpleGridProps {
  children: ReactNode;
}

const IndentationList = ({ children, ...props }: IProps) => {
  return (
    <ListItem colSpan={{ base: 3, lg: 2 }}>
      <List columns={1} pt={{ base: 0, lg: 2 }} mb={{ base: 0, lg: 2 }} {...props}>
        {children}
      </List>
    </ListItem>
  );
};

export { IndentationList };
