import React from 'react';
import TextMaskedInput, { MaskedInputProps as TextMaskedInputProps } from 'react-text-mask';
import { Input, InputProps } from '@chakra-ui/react';

export type MaskedInputProps = InputProps & TextMaskedInputProps;

const MaskedInput = (props: MaskedInputProps) => {
  return <Input as={TextMaskedInput} guide {...props} />;
};

export { MaskedInput };
