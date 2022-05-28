import React, { ReactNode } from 'react';

import { GridItem, GridItemProps } from '@chakra-ui/react';
import { ValueText } from './ValueText';

interface IProps extends GridItemProps {
  children: ReactNode;
}

const Value = ({ children, ...props }: IProps) => {
  if (!children) {
    return (
      <GridItem colSpan={{ base: 3, lg: 2 }} {...props}>
        <ValueText>---</ValueText>
      </GridItem>
    );
  }

  return (
    <GridItem colSpan={{ base: 3, lg: 2 }} py={{ base: 0, lg: 2 }} {...props}>
      {typeof children === 'string' ? <ValueText>{children}</ValueText> : children}
    </GridItem>
  );
};

export { Value };
