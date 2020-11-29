import { IOfferVariant } from '../../domain/types';

export class OfferDto {
  offerId: string;
  facilityId: string;
  name: string;
  variants: IOfferVariant[];
}
