import { IOfferVariant } from '../../../domain/types';

export interface AddOfferDto {
  offerName: string;
  variants: IOfferVariant[];
}
