import { IOfferVariant } from '../domain/types';

export interface BuildOfferDto {
  offerName: string;
  variants: IOfferVariant[];
}
