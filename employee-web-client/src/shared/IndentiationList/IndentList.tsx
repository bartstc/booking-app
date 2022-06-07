import React, { ReactNode } from 'react';
import { SimpleGridProps } from '@chakra-ui/react';

import { List, ListItem } from 'shared/DescriptionListV2';

interface IProps extends SimpleGridProps {
  children: ReactNode;
}

const IndentList = ({ children, ...props }: IProps) => {
  return (
    <ListItem colSpan={{ base: 3, lg: 2 }}>
      <List columns={1} pt={{ base: 0, lg: 2 }} mb={{ base: 0, lg: 2 }} {...props}>
        {children}
      </List>
    </ListItem>
  );
};

export { IndentList };
