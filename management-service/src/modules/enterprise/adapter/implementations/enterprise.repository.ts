import { EntityRepository, Repository } from 'typeorm/index';

import { EnterpriseEntity } from '../../infra/entities';
import { EnterpriseRepo } from '../enterpriseRepo';
import { Enterprise } from '../../domain';
import { EnterpriseMap } from './enterprise.map';

@EntityRepository(EnterpriseEntity)
export class EnterpriseRepository extends Repository<EnterpriseEntity>
  implements EnterpriseRepo {
  async exists(enterpriseId: string): Promise<boolean> {
    try {
      await this.getRawEnterpriseById(enterpriseId);
    } catch {
      return false;
    }

    return true;
  }

  async getEnterpriseById(enterpriseId: string): Promise<Enterprise> {
    const enterprise = await this.findOne({ enterprise_id: enterpriseId });
    if (!enterprise) throw new Error('Enterprise not found');
    return EnterpriseMap.toDomain(enterprise);
  }

  async getRawEnterpriseById(enterpriseId: string): Promise<EnterpriseEntity> {
    const enterpriseRaw = await this.findOne({ enterprise_id: enterpriseId });
    if (!enterpriseRaw) throw new Error('Enterprise not found');
    return enterpriseRaw;
  }

  async addFacility(enterpriseId: string, facilityId: string): Promise<void> {
    const enterprise = await this.getRawEnterpriseById(enterpriseId);
    if (!enterprise) throw new Error('Enterprise not found');

    enterprise.facility_ids.push(facilityId);
    await enterprise.save();
  }

  async removeFacility(
    enterpriseId: string,
    facilityId: string,
  ): Promise<void> {
    const enterprise = await this.getRawEnterpriseById(enterpriseId);
    if (!enterprise) throw new Error('Enterprise not found');

    enterprise.facility_ids = enterprise.facility_ids.filter(
      id => id !== facilityId,
    );
    await enterprise.save();
  }
}
