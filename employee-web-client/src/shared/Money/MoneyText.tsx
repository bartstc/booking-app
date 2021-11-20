import React from 'react';
import { FormattedNumber } from 'react-intl';
import { NumberFormatProps } from 'react-number-format';
import { Currency } from '../../types';

interface IProps extends NumberFormatProps {
  value: number | string;
  currency?: Currency;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

const MoneyText = ({ value, currency, maximumFractionDigits = 2, minimumFractionDigits = 2 }: IProps) => {
  if (currency) {
    return (
      <>
        <FormattedNumber
          value={Number(value)}
          minimumFractionDigits={minimumFractionDigits}
          maximumFractionDigits={maximumFractionDigits}
        />
        {` ${currency.toUpperCase()}`}
      </>
    );
  }

  return (
    <FormattedNumber value={Number(value)} minimumFractionDigits={minimumFractionDigits} maximumFractionDigits={maximumFractionDigits} />
  );
};

export { MoneyText };
