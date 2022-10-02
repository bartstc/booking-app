import React, { forwardRef } from 'react';

import { Input, InputGroup, InputRightElement, chakra } from '@chakra-ui/react';

import { INumberInputProps, NumberInput } from './NumberInput';
import { Currency } from 'types';

export interface ICurrencyInputProps extends INumberInputProps {
  currency?: string;
}

const CurrencyInput = (props: ICurrencyInputProps) => {
  // @ts-ignore
  return <NumberInput customInput={CustomInput} {...props} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
const CustomInput = forwardRef((props: any, ref) => {
  return (
    <InputGroup>
      <Input fontSize='sm' _placeholder={{ color: 'gray.500' }} ref={ref} {...props} />
      <InputRightElement mx={2} zIndex={0}>
        <chakra.span fontSize='xs' color={props.value ? 'gray.700' : 'gray.400'}>
          {props.currency ?? Currency.Eu}
        </chakra.span>
      </InputRightElement>
    </InputGroup>
  );
});

export { CurrencyInput };
