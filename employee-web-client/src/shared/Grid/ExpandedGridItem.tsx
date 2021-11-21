import React from 'react';
import { GridItem, ChakraProps } from '@chakra-ui/react';

interface IProps extends ChakraProps {}

const ExpandedGridItem = (props: IProps) => {
  return (
    <GridItem gridColumn='1/-1' {...props}>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, tenetur.</h1>
    </GridItem>
  );
};

export { ExpandedGridItem };
