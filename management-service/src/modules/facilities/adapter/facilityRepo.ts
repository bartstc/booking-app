import { Facility } from '../domain';

export interface FacilityRepo {
  exists(facilityId: string): Promise<boolean>;
  getFacilityById(facilityId: string): Promise<Facility>;
  // getRawFacilityById(facilityId: string): Promise<FacilityEntity>;
  persistModel(facility: Facility): Promise<void>;
}
