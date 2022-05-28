import React, { ReactNode } from 'react';

import { GridItem, GridItemProps, Text, useColorModeValue } from '@chakra-ui/react';

interface IProps extends GridItemProps {
  children: ReactNode;
}

const Label = ({ children, ...props }: IProps) => {
  const color = useColorModeValue('gray.500', 'gray.400');

  return (
    <GridItem colSpan={{ base: 3, lg: 1 }} py={{ base: 0, lg: 2 }} {...props}>
      {typeof children === 'string' ? (
        <Text fontSize={{ base: 'sm', lg: 'md' }} m={0} color={color}>
          {children}
        </Text>
      ) : (
        children
      )}
    </GridItem>
  );
};

export { Label };
