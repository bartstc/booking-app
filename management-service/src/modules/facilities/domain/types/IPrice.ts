import { PriceModel } from './PriceModel';
import { Currency } from './Currency';

export interface IPrice {
  type: PriceModel;
  value: string;
  currency: Currency;
}
