import { EntityRepository, Repository } from 'typeorm/index';

import { EnterpriseEntity } from '../../infra/entities';
import { EnterpriseRepo } from '../enterpriseRepo';
import { Enterprise } from '../../domain';
import { EnterpriseMap } from './enterprise.map';

@EntityRepository(EnterpriseEntity)
export class EnterpriseRepository extends Repository<EnterpriseEntity>
  implements EnterpriseRepo {
  async exists(enterpriseId: string): Promise<boolean> {
    const existingEnterprise = await this.createQueryBuilder(
      'enterprise',
    ).where('enterprise.enterprise_id = :enterpriseId', {
      enterpriseId,
    });

    return !!existingEnterprise;
  }

  async getEnterpriseById(enterpriseId: string): Promise<Enterprise> {
    const enterprise = await this.findOne({ enterprise_id: enterpriseId });
    if (!enterprise) throw new Error('Enterprise not found');
    return EnterpriseMap.toDomain(enterprise);
  }

  async persist(enterprise: Enterprise): Promise<void> {
    const enterpriseEntity = await EnterpriseMap.toPersistence(enterprise);
    await this.create(enterpriseEntity).save();
  }
}
