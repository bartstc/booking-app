import { Enterprise } from '../domain';

export interface EnterpriseRepo {
  exists(enterpriseId: string): Promise<boolean>;
  getEnterpriseById(enterpriseId: string): Promise<Enterprise>;
  persist(enterprise: Enterprise): Promise<void>;
}
