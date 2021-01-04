import React from 'react';
import { Tooltip as ChakraTooltip, TooltipProps } from '@chakra-ui/react';

const Tooltip = ({ children, ...props }: TooltipProps) => {
  return (
    <ChakraTooltip textAlign='center' {...props}>
      {children}
    </ChakraTooltip>
  );
};

export { Tooltip };
