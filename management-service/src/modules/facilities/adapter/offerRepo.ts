import { Offer } from '../domain';
import { OfferEntity } from '../infra/entities';

export interface OfferRepo {
  exists(offerId: string): Promise<boolean>;
  getRawOfferById(offerId: string): Promise<OfferEntity>;
  getOfferById(offerId: string): Promise<Offer>;
  getAllOffers(facilityId: string): Promise<Offer[]>;
  getRawAllOffers(facilityId: string): Promise<OfferEntity[]>;
  persistModel(offer: Offer): Promise<OfferEntity>;
}
