import { Facility } from '../domain';
import { FacilityEntity } from '../infra/entities';

export interface FacilityRepo {
  exists(facilityId: string): Promise<boolean>;
  getRawFacilityById(facilityId: string): Promise<FacilityEntity>;
  persistModel(facility: Facility): Promise<FacilityEntity>;
  deleteFacility(facilityId: string): Promise<void>;
}
