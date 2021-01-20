import React from 'react';
import { Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';

export type InputProps = ChakraInputProps;

const Input = (props: InputProps) => {
  return <ChakraInput {...props} />;
};

export { Input };
