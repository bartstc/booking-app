import React from 'react';
import { FormattedNumber } from 'react-intl';
import { NumberFormatProps } from 'react-number-format';

interface IProps extends NumberFormatProps {
  value: number | string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

const MoneyText = ({ value, maximumFractionDigits = 2, minimumFractionDigits = 2 }: IProps) => {
  return (
    <FormattedNumber value={Number(value)} minimumFractionDigits={minimumFractionDigits} maximumFractionDigits={maximumFractionDigits} />
  );
};

export { MoneyText };
