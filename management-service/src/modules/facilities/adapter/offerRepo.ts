import { Offer } from '../domain';

export interface OfferRepo {
  getOfferById(offerId: string): Promise<Offer>;
  getOffers(ids: string[]): Promise<Offer[]>;
  // persistModel(offer: Offer): Promise<void>;
}
