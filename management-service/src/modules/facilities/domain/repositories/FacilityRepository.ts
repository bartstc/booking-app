import { Facility } from '../Facility';
import { Slug } from '../Slug';
import { FacilityId } from '../FacilityId';
import { CustomerId } from '../../../customers/domain';

export interface FacilityRepository {
  exists(facilityId: string): Promise<boolean>;
  getFacilityById(facilityId: string): Promise<Facility>;
  slugExists(slug: Slug): Promise<boolean>;
  persist(facility: Facility): Promise<unknown>;
  deleteFacility(facilityId: string): Promise<void>;
  addCustomer(facilityId: FacilityId, customerId: CustomerId): Promise<void>;
  removeCustomer(facilityId: FacilityId, customerId: CustomerId): Promise<void>;
}
