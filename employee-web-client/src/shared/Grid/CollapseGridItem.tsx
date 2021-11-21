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
    <GridItem borderLeft={`3px solid ${borderColor}`} in={isOpen} animateOpacity unmountOnExit as={Collapse} gridColumn='1/-1' {...props}>
      <chakra.div p='1rem 0.75rem' pl='2.95rem'>
        {children}
      </chakra.div>
    </GridItem>
  );
};

export { CollapseGridItem };
