import { Facility } from '../domain';
import { FacilityEntity } from '../infra/entities';

export interface FacilityRepo {
  exists(facilityId: string): Promise<boolean>;
  getFacilityById(facilityId: string): Promise<Facility>;
  getRawFacilityById(facilityId: string): Promise<FacilityEntity>;
  persistModel(facility: Facility): Promise<void>;
  deleteFacility(facilityId: string): Promise<void>;
}
