import React from 'react';
import NumberFormat, { NumberFormatProps, NumberFormatValues } from 'react-number-format';
import currency from 'currency.js';
import { Input } from '@chakra-ui/react';

export interface MoneyInputProps extends NumberFormatProps {
  value: number | string;
}

const MoneyInput = ({ hasError, value, ...props }: MoneyInputProps) => {
  const formatProps: NumberFormatProps = {
    thousandSeparator: ',',
    decimalSeparator: '.',
    decimalScale: 2,
    fixedDecimalScale: true,
    placeholder: '0.00',
  };

  return (
    // @ts-ignore
    <Input
      as={NumberFormat}
      {...formatProps}
      {...props}
      hasError={hasError}
      value={value ? currency(value, { precision: 10 }).value : ''}
      allowNegative={false}
      isAllowed={({ floatValue }: NumberFormatValues) => {
        if (!floatValue) {
          return true;
        }
        return floatValue >= 0 && floatValue <= 999999999999.99;
      }}
    />
  );
};

export { MoneyInput };
