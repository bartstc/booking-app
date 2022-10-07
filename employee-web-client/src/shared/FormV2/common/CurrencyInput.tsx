import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Currency, OptionType } from 'types';
import { Select, ISelectProps } from '../fields';

export const currencyOptions: OptionType[] = [
  {
    value: Currency.Eu,
    label: Currency.Eu.toUpperCase(),
  },
  {
    value: Currency.Pln,
    label: Currency.Pln.toUpperCase(),
  },
];

interface IProps extends Omit<ISelectProps<Currency>, 'options' | 'label' | 'children'> {}

const CurrencyInput = (props: IProps) => {
  return (
    <Select options={currencyOptions} isRequired {...props}>
      <FormattedMessage id='currency-type' defaultMessage='Currency' />
    </Select>
  );
};

export { CurrencyInput };
