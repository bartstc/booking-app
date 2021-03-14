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
      status = '' as any,
      currency = '' as any,
      order: orderKey,
    }: OfferCollectionQueryParams,
  ): Promise<QueryListResult<OfferDto>> {
    let query = this.paginatedQueryBuilder('offer', {
      limit,
      offset,
    })
      .where('offer.facility_id = :facilityId', { facilityId })
      .andWhere(`offer.status ilike '%${status}%'`)
      .andWhere(`offer.details::jsonb->>'name' ilike '%${name}%'`)
      .andWhere(`offer.details::jsonb->'price'->>'type' ilike '%${priceType}%'`)
      .andWhere(
        `offer.details::jsonb->'price'->>'currency' ilike '%${currency}%'`,
      );

    if (orderKey) {
      const [sort, order] = this.extractOrder(orderKey);

      if (sort === 'priceType') {
        query = query.orderBy(`offer.details::jsonb->'price'->>'type'`, order);
      } else if (sort === 'status') {
        query = query.orderBy(`offer.status`, order);
      }
    }

    const [collection, total] = await query.getManyAndCount();

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
