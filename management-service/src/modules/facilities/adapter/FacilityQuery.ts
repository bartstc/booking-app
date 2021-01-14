import { FacilityDto } from '../application/dto';
import { QueryListResult, QueryParams } from '../../../shared/core';

export interface FacilityQuery {
  getFacilityById(facilityId: string): Promise<FacilityDto>;
  getFacilityBySlug(slug: string): Promise<FacilityDto>;
  getFacilities<Params extends QueryParams>(
    enterpriseId: string,
    params: Params,
  ): Promise<QueryListResult<FacilityDto>>;
}
