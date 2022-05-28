import React, { ReactNode } from 'react';
import { GridItemProps } from '@chakra-ui/react';

import { Value } from '../Value';

interface IProps extends GridItemProps {
  children: ReactNode;
}

const IndentValue = ({ children, ...props }: IProps) => {
  return (
    <Value colSpan={1} py={0} pb={2} {...props}>
      {children}
    </Value>
  );
};

export { IndentValue };
