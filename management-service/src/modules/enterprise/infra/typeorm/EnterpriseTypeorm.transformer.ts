import { EnterpriseDto } from '../../application/dto';
import { EnterpriseEntity } from './Enterprise.entity';

export class EnterpriseTypeormTransformer {
  public static toDto(enterprise: EnterpriseEntity): EnterpriseDto {
    return {
      enterpriseId: enterprise.enterprise_id,
      enterpriseName: enterprise.details.name,
      enterpriseDescription: enterprise.details.description,
      enterpriseUrl: enterprise.details.url,
      countryCode: enterprise.details.countryCode,
      contactPerson: enterprise.details.contactPerson,
      createdAt: enterprise.createdAt,
      updatedAt: enterprise.updatedAt,
    };
  }
}
