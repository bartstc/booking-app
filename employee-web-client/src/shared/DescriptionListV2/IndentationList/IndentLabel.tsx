import React, { ReactNode } from 'react';
import { GridItemProps } from '@chakra-ui/react';

import { Label } from '../Label';

interface IProps extends GridItemProps {
  children: ReactNode;
}

const IndentLabel = ({ children, ...props }: IProps) => {
  return (
    <Label colSpan={1} py={0} {...props}>
      {children}
    </Label>
  );
};

export { IndentLabel };
