import React, { ReactNode } from 'react';
import { chakra, ChakraProps } from '@chakra-ui/react';

interface IProps extends ChakraProps {
  children: ReactNode | string;
  isBold?: boolean;
}

const PrimaryText = ({ isBold = false, children, ...props }: IProps) => {
  return (
    <chakra.div isTruncated fontWeight={isBold ? '600' : 'inherit'} {...props}>
      {children}
    </chakra.div>
  );
};

export { PrimaryText };
