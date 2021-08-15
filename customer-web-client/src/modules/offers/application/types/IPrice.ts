import { Currency } from 'types';

import { PriceModel } from './PriceModel';

export interface IPrice {
  type: PriceModel;
  value: string;
  currency: Currency;
}
