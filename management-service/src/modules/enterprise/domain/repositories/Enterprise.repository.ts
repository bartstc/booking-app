import { Enterprise } from '../Enterprise';

export interface EnterpriseRepository {
  exists(enterpriseId: string): Promise<boolean>;
  getEnterpriseById(enterpriseId: string): Promise<Enterprise>;
  addFacility(enterpriseId: string, facilityId: string): Promise<void>;
  removeFacility(enterpriseId: string, facilityId: string): Promise<void>;
  persist(model: Enterprise): Promise<unknown>;
}
