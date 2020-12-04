import { Facility } from '../Facility';
import { Slug } from '../Slug';

export interface FacilityRepository {
  exists(facilityId: string): Promise<boolean>;
  getFacilityById(facilityId: string): Promise<Facility>;
  slugExists(slug: Slug): Promise<boolean>;
  persist(facility: Facility): Promise<unknown>;
  deleteFacility(facilityId: string): Promise<void>;
  addCustomer(facilityId: string, customerId: string): Promise<void>;
  removeCustomer(facilityId: string, customerId: string): Promise<void>;
}
