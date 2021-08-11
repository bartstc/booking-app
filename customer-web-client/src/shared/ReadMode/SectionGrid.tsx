import React from 'react';
import { SimpleGridProps, SimpleGrid } from '@chakra-ui/react';

interface IProps extends SimpleGridProps {}

const SectionGrid = ({ children, ...props }: IProps) => {
  return (
    <SimpleGrid columns={3} spacingX={10} spacingY={6} {...props}>
      {children}
    </SimpleGrid>
  );
};

export { SectionGrid };
