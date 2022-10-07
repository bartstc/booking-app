import React, { forwardRef } from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

import { Input } from '@chakra-ui/react';

export interface INumberInputProps extends NumberFormatProps {
  thousandSeparator?: boolean | string;
}

// eslint-disable-next-line react/display-name
const NumberInput = forwardRef<unknown, INumberInputProps>(({ thousandSeparator = ' ', ...props }, ref) => {
  return (
    <NumberFormat
      thousandSeparator={thousandSeparator}
      decimalSeparator=','
      decimalScale={2}
      fixedDecimalScale
      placeholder='0,00'
      customInput={Input}
      fontSize='sm'
      allowNegative={false}
      // @ts-ignore
      itemRef={ref}
      {...props}
    />
  );
});

export { NumberInput };
