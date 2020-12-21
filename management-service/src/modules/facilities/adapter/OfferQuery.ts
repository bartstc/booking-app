import { OfferDto } from '../application/dto';

export interface OfferQuery {
  getOfferById(offerId: string): Promise<OfferDto>;
  getFacilityOffers(facilityId: string): Promise<OfferDto[]>;
}
