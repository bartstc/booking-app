import { EntityRepository, Repository } from 'typeorm/index';

import { OfferEntity } from '../../infra/entities';
import { Offer } from '../../domain';
import { OfferRepo } from '../offerRepo';
import { OfferMap } from './offer.map';

@EntityRepository(OfferEntity)
export class OfferRepository extends Repository<OfferEntity>
  implements OfferRepo {
  async exists(offerId: string): Promise<boolean> {
    const existingOffer = await this.createQueryBuilder(
      'offer',
    ).where('offer.offer_id = "offerId', { offerId });

    return !!existingOffer;
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

  async persistModel(offer: Offer): Promise<void> {
    await this.create(OfferMap.modelToPersistence(offer)).save();
  }

  async deleteOffer(offerId: string): Promise<void> {
    const result = await this.delete({ offer_id: offerId });

    if (result.affected === 0) {
      throw new Error(`Offer with id ${offerId} not found`);
    }
  }
}
