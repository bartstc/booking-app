import { EntityRepository, Repository } from 'typeorm/index';

import { OfferEntity } from '../../infra/entities';
import { Offer } from '../../domain';
import { OfferRepo } from '../offerRepo';
import { OfferMap } from './offer.map';

@EntityRepository(OfferEntity)
export class OfferRepository extends Repository<OfferEntity>
  implements OfferRepo {
  async exists(offerId: string): Promise<boolean> {
    try {
      await this.getOfferById(offerId);
    } catch {
      return false;
    }

    return true;
  }

  async getOfferById(offerId: string): Promise<Offer> {
    const offer = await this.findOne({ offer_id: offerId });
    if (!offer) throw new Error('Offer not found');
    return OfferMap.toDomain(offer);
  }

  async getAllOffers(facilityId: string): Promise<Offer[]> {
    const offers = await this.getRawAllOffers(facilityId);
    return offers.length ? OfferMap.toDomainBulk(offers) : [];
  }

  async getRawAllOffers(facilityId: string): Promise<OfferEntity[]> {
    return await this.find({ facility_id: facilityId });
  }

  async persistModel(offer: Offer): Promise<OfferEntity> {
    return this.create(OfferMap.modelToPersistence(offer));
  }
}
