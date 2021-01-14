import { EntityRepository } from 'typeorm/index';

import { BaseQuery } from 'shared/core/typeorm';
import { QueryListResult } from 'shared/core';

import { OfferEntity } from './Offer.entity';
import { OfferTypeormTransformer } from './OfferTypeorm.transformer';
import { OfferDto } from '../../../application/dto';
import { OfferQuery } from '../../../adapter';
import { OfferCollectionQueryParams } from '../../../adapter/params';

@EntityRepository(OfferEntity)
export class OfferTypeormQuery
  extends BaseQuery<OfferEntity>
  implements OfferQuery {
  async getOfferById(offerId: string): Promise<OfferDto> {
    const offer = await this.findOne({ offer_id: offerId });
    if (!offer) throw new Error('Offer not found');
    return OfferTypeormTransformer.toDto(offer);
  }

  async getOffers(
    facilityId: string,
    {
      limit = 10,
      offset = 0,
      name = '',
      priceType = '' as any,
    }: OfferCollectionQueryParams,
  ): Promise<QueryListResult<OfferDto>> {
    const [collection, total] = await this.paginatedQueryBuilder('offer', {
      limit,
      offset,
    })
      .where('offer.facility_id = :facilityId', { facilityId })
      .andWhere(`offer.details::jsonb->>'name' ilike '%${name}%'`)
      .andWhere(`offer.details::jsonb->'price'->>'type' ilike '%${priceType}%'`)
      .getManyAndCount();

    return {
      collection: OfferTypeormTransformer.toDtoBulk(collection),
      meta: {
        total,
        offset,
        limit,
      },
    };
  }
}
