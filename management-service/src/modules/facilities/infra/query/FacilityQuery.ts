import { FacilityDto } from '../../application/dto';

export interface FacilityQuery {
  getFacilityById(facilityId: string): Promise<FacilityDto>;
  getFacilityBySlug(slug: string): Promise<FacilityDto>;
}
