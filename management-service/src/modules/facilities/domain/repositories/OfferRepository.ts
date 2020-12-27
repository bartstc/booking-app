import { Offer } from '../Offer';

export interface OfferRepository {
  exists(offerId: string): Promise<boolean>;
  getOfferById(offerId: string): Promise<Offer>;
  persist(offer: Offer): Promise<any>;
}
