import { EntityRepository } from 'typeorm/index';

import { BaseQuery, QueryListResult } from 'shared/core';

import { FacilityEntity } from './Facility.entity';
import { FacilityDto } from '../../../application/dto';
import { FacilityTypeormTransformer } from './FacilityTypeorm.transformer';
import { FacilityCollectionQueryParams, FacilityQuery } from '../../../adapter';

@EntityRepository(FacilityEntity)
export class FacilityTypeormQuery
  extends BaseQuery<FacilityEntity>
  implements FacilityQuery {
  constructor() {
    super();
  }

  async getFacilityBySlug(slug: string): Promise<FacilityDto> {
    const facility = await this.findOne({ slug });
    if (!facility) throw new Error('Facility not found');
    return FacilityTypeormTransformer.toDto(facility);
  }

  async getFacilityById(facilityId: string): Promise<FacilityDto> {
    const facility = await this.findOne({ facility_id: facilityId });
    if (!facility) throw new Error('Facility not found');
    return FacilityTypeormTransformer.toDto(facility);
  }

  async getFacilities(
    enterpriseId: string,
    { name = '', limit = 10, offset = 0 }: FacilityCollectionQueryParams,
  ): Promise<QueryListResult<FacilityDto>> {
    const [collection, total] = await this.paginatedQueryBuilder('facility', {
      limit,
      offset,
    })
      .where('facility.enterprise_id = :enterpriseId', { enterpriseId })
      .andWhere(`facility.details::jsonb->>'name' ilike '%${name}%'`)
      .getManyAndCount();

    return {
      collection: FacilityTypeormTransformer.toDtoBulk(collection),
      meta: {
        total,
        offset,
        limit,
      },
    };
  }
}
