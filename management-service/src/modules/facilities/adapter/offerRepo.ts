import { Offer } from '../domain';
import { OfferEntity } from '../infra/entities';

export interface OfferRepo {
  getOfferById(offerId: string): Promise<Offer>;
  getAllOffers(facilityId: string): Promise<Offer[]>;
  getRawAllOffers(facilityId: string): Promise<OfferEntity[]>;
  persistModel(offer: Offer): Promise<void>;
  deleteOffer(offerId: string): Promise<void>;
}
