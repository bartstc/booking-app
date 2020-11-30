import { EntityRepository, Repository } from 'typeorm/index';

import { OfferEntity } from './Offer.entity';
import { OfferQuery } from '../../OfferQuery';
import { OfferTypeormTransformer } from './OfferTypeorm.transformer';
import { OfferDto } from '../../../application/dto';

@EntityRepository(OfferEntity)
export class OfferTypeormQuery extends Repository<OfferEntity>
  implements OfferQuery {
  async getOfferById(offerId: string): Promise<OfferDto> {
    const offer = await this.findOne({ offer_id: offerId });
    if (!offer) throw new Error('Offer not found');
    return OfferTypeormTransformer.toDto(offer);
  }

  async getFacilityOffers(facilityId: string): Promise<OfferDto[]> {
    const offers = await this.find({ facility_id: facilityId });
    return offers.length ? OfferTypeormTransformer.toDtoBulk(offers) : [];
  }
}
