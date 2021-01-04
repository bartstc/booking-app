import React, { ReactNode } from 'react';
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

interface IProps extends ButtonProps {
  children: ReactNode | string;
}

const Button = ({ id, children, ...props }: IProps) => {
  return (
    <ChakraButton id={id} data-testid={id} {...props}>
      {children}
    </ChakraButton>
  );
};

export { Button };
