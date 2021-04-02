import { IPrice } from '../types';

export interface IAddOfferDto {
  offerName: string;
  duration: number;
  price: IPrice;
}
