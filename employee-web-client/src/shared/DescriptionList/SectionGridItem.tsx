import React from 'react';
import { GridItem, GridItemProps } from '@chakra-ui/react';

interface IProps extends GridItemProps {}

const SectionGridItem = ({ children, ...props }: IProps) => {
  return <GridItem {...props}>{children}</GridItem>;
};

export { SectionGridItem };
