import { Enterprise } from '../Enterprise';

export interface EnterpriseRepository {
  exists(enterpriseId: string): Promise<boolean>;
  getEnterpriseById(enterpriseId: string): Promise<Enterprise>;
  persist(model: Enterprise): Promise<unknown>;
}
