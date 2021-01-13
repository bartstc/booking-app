import { EnterpriseDto } from '../application/dto';

export interface EnterpriseQuery {
  exists(enterpriseId: string): Promise<boolean>;
  getEnterpriseById(enterpriseId: string): Promise<EnterpriseDto>;
  getEnterprises(): Promise<EnterpriseDto[]>;
}
