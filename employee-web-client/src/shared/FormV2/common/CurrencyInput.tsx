import React from 'react';
import { chakra } from '@chakra-ui/react';
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
      <chakra.span>Currency</chakra.span>
    </Select>
  );
};

export { CurrencyInput };
