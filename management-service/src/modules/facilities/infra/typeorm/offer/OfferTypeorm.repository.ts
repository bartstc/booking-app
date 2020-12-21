import { EntityRepository, Repository } from 'typeorm/index';

import { OfferEntity } from './Offer.entity';
import { OfferRepository } from '../../../domain/repositories';
import { Offer } from '../../../domain';
import { OfferMap } from '../../../adapter';

@EntityRepository(OfferEntity)
export class OfferTypeormRepository extends Repository<OfferEntity>
  implements OfferRepository {
  async exists(offerId: string): Promise<boolean> {
    try {
      await this.getRawOfferById(offerId);
    } catch {
      return false;
    }

    return true;
  }

  async getOfferById(offerId: string): Promise<Offer> {
    const offer = await this.getRawOfferById(offerId);
    return OfferMap.entityToDomain(offer);
  }

  async persist(offer: Offer): Promise<OfferEntity> {
    return this.create(OfferMap.toPersistence(offer));
  }

  private async getRawOfferById(offerId: string): Promise<OfferEntity> {
    const offer = await this.findOne({ offer_id: offerId });
    if (!offer) throw new Error('Offer not found');
    return offer;
  }
}
