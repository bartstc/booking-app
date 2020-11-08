import { EntityRepository, Repository } from 'typeorm/index';

import { OfferEntity } from '../../infra/entities';
import { Offer } from '../../domain';
import { OfferRepo } from '../offerRepo';
import { OfferMap } from './offer.map';

@EntityRepository(OfferEntity)
export class OfferRepository extends Repository<OfferEntity>
  implements OfferRepo {
  async getOfferById(offerId: string): Promise<Offer> {
    const offer = await this.findOne({ offer_id: offerId });
    if (!offer) throw new Error('Offer not found');
    return OfferMap.toDomain(offer);
  }

  async getOffers(ids: string[]): Promise<Offer[]> {
    const offers = await this.findByIds(ids);
    return offers.length ? OfferMap.toDomainBulk(offers) : [];
  }
}
