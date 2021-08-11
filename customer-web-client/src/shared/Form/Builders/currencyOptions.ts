import { Currency, OptionType } from 'types';

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
