import { EnterpriseDto } from '../../application/dto';
import { EnterpriseEntity } from './Enterprise.entity';

export class EnterpriseTypeormTransformer {
  public static toDto(enterprise: EnterpriseEntity): EnterpriseDto {
    return {
      enterpriseId: enterprise.enterprise_id,
      enterpriseName: enterprise.details.name,
      enterpriseDescription: enterprise.details.description,
      enterpriseUrl: enterprise.details.url,
      contactPerson: enterprise.details.contactPerson,
      createdAt: enterprise.created_at,
      updatedAt: enterprise.updated_at,
    };
  }

  public static toDtoBulk(enterprises: EnterpriseEntity[]): EnterpriseDto[] {
    return enterprises.map((enterprise) => this.toDto(enterprise));
  }
}
