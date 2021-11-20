import React, { ReactNode } from 'react';
import { chakra, ChakraProps } from '@chakra-ui/react';

interface IProps extends ChakraProps {
  children: ReactNode | string;
  isBold?: boolean;
}

const PrimaryText = ({ isBold = false, children, ...props }: IProps) => {
  return (
    <chakra.p isTruncated fontWeight={isBold ? '600' : 'inherit'} {...props}>
      {children}
    </chakra.p>
  );
};

export { PrimaryText };
