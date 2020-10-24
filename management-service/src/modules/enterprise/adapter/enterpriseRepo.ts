import { Enterprise } from '../domain';
import { EnterpriseEntity } from '../infra/entities';
import { EnterpriseDto } from '../application/dtos';

export interface EnterpriseRepo {
  exists(enterpriseId: string): Promise<boolean>;
  getEnterpriseById(enterpriseId: string): Promise<Enterprise>;
  getRawEnterpriseById(enterpriseId: string): Promise<EnterpriseEntity>;
  persistModel(enterprise: Enterprise): Promise<void>;
  persistDto(enterpriseId: string, dto: EnterpriseDto): Promise<void>;
}
