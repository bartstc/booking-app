import { EntityRepository, Repository } from 'typeorm/index';

import { Enterprise, EnterpriseRepository } from '../../domain';
import { EnterpriseEntity } from './Enterprise.entity';
import { EnterpriseMap } from './Enterprise.map';

@EntityRepository(EnterpriseEntity)
export class EnterpriseTypeormRepository extends Repository<EnterpriseEntity>
  implements EnterpriseRepository {
  async exists(enterpriseId: string): Promise<boolean> {
    try {
      await this.getRawEnterpriseById(enterpriseId);
    } catch {
      return false;
    }

    return true;
  }

  async getEnterpriseById(enterpriseId: string): Promise<Enterprise> {
    const enterprise = await this.getRawEnterpriseById(enterpriseId);
    return EnterpriseMap.entityToDomain(enterprise);
  }

  async addFacility(enterpriseId: string, facilityId: string): Promise<void> {
    const enterprise = await this.getRawEnterpriseById(enterpriseId);
    enterprise.facility_ids.push(facilityId);
    await enterprise.save();
  }

  async removeFacility(
    enterpriseId: string,
    facilityId: string,
  ): Promise<void> {
    const enterprise = await this.getRawEnterpriseById(enterpriseId);
    enterprise.facility_ids = enterprise.facility_ids.filter(
      id => id !== facilityId,
    );
    await enterprise.save();
  }

  async persist(model: Enterprise): Promise<EnterpriseEntity> {
    return this.create(EnterpriseMap.toPersistence(model));
  }

  private async getRawEnterpriseById(
    enterpriseId: string,
  ): Promise<EnterpriseEntity> {
    const enterpriseRaw = await this.findOne({ enterprise_id: enterpriseId });
    if (!enterpriseRaw) throw new Error('Enterprise not found');
    return enterpriseRaw;
  }
}
