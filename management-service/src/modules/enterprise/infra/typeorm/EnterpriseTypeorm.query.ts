import { EntityRepository, Repository } from 'typeorm/index';

import { EnterpriseEntity } from './Enterprise.entity';
import { EnterpriseDto } from '../../application/dto';
import { EnterpriseTypeormTransformer } from './EnterpriseTypeorm.transformer';
import { EnterpriseQuery } from '../../adapter';

@EntityRepository(EnterpriseEntity)
export class EnterpriseTypeormQuery
  extends Repository<EnterpriseEntity>
  implements EnterpriseQuery {
  async exists(enterpriseId: string): Promise<boolean> {
    const enterpriseRaw = await this.findOne({ enterprise_id: enterpriseId });
    return !!enterpriseRaw;
  }

  async getEnterpriseById(enterpriseId: string): Promise<EnterpriseDto> {
    const enterpriseRaw = await this.findOne({ enterprise_id: enterpriseId });
    if (!enterpriseRaw) throw new Error('Enterprise not found');
    return EnterpriseTypeormTransformer.toDto(enterpriseRaw);
  }

  async getEnterpriseByOwnerId(ownerId: string): Promise<EnterpriseDto> {
    const enterpriseRaw = await this.findOne({ owner_id: ownerId });
    if (!enterpriseRaw) throw new Error('Enterprise not found');
    return EnterpriseTypeormTransformer.toDto(enterpriseRaw);
  }

  async getEnterprises(): Promise<EnterpriseDto[]> {
    const rawEnterprises = await this.find();
    return EnterpriseTypeormTransformer.toDtoBulk(rawEnterprises);
  }
}
