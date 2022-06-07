import React, { ReactNode } from 'react';
import { GridItemProps } from '@chakra-ui/react';

import { ListItem } from 'shared/DescriptionListV2';

interface IProps extends GridItemProps {
  children: ReactNode;
}

const IndentLabel = ({ children, ...props }: IProps) => {
  return (
    <ListItem colSpan={{ base: 3, lg: 1 }} py={2} pb={{ base: 0, lg: 2 }} {...props}>
      {children}
    </ListItem>
  );
};

export { IndentLabel };
