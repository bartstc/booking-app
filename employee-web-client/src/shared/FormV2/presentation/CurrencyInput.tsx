import React, { forwardRef } from 'react';

import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { INumberInputProps, NumberInput } from './NumberInput';

export interface ICurrencyInputProps extends INumberInputProps {}

const CurrencyInput = (props: ICurrencyInputProps) => {
  // @ts-ignore
  return <NumberInput customInput={CustomInput} {...props} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
const CustomInput = forwardRef((props: any, ref) => {
  return (
    <InputGroup>
      <Input fontSize='sm' _placeholder={{ color: 'gray.500' }} ref={ref} {...props} />
      <InputRightElement mx={2} zIndex={0} />
    </InputGroup>
  );
});

export { CurrencyInput };
