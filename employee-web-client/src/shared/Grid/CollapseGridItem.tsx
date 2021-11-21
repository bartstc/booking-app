import React, { ReactNode } from 'react';
import { GridItem, Collapse, chakra, ChakraProps, useColorModeValue, useTheme } from '@chakra-ui/react';

interface IProps extends ChakraProps {
  children: ReactNode;
  isOpen: boolean;
}

const CollapseGridItem = ({ children, isOpen, ...props }: IProps) => {
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[700]);

  return (
    <GridItem borderLeft={`3px solid ${borderColor}`} in={isOpen} animateOpacity as={Collapse} gridColumn='1/-1' {...props}>
      <chakra.div p='0.75rem'>{children}</chakra.div>
    </GridItem>
  );
};

export { CollapseGridItem };
