import React, { ReactNode } from "react";

import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";

interface IProps extends SimpleGridProps {
  children: ReactNode;
}

const List = ({ children, ...props }: IProps) => {
  return (
    <SimpleGrid columns={3} spacingX={6} spacingY={1} fontSize='md' w='100%' {...props}>
      {children}
    </SimpleGrid>
  );
};

export { List };
