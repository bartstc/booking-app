import { EntityRepository, Repository } from 'typeorm/index';

import { FacilityEntity } from './Facility.entity';
import { FacilityQuery } from '../../FacilityQuery';
import { FacilityDto } from '../../../application/dto';
import { FacilityTypeormTransformer } from './FacilityTypeorm.transformer';

@EntityRepository(FacilityEntity)
export class FacilityTypeormQuery extends Repository<FacilityEntity>
  implements FacilityQuery {
  constructor() {
    super();
  }

  async getFacilityBySlug(slug: string): Promise<FacilityDto> {
    const facility = await this.findOne({ slug });
    if (!facility) throw new Error('Facility not found');
    return FacilityTypeormTransformer.toDto(facility);
  }

  async getFacilityById(facilityId: string): Promise<FacilityDto> {
    const facility = await this.findOne({ facility_id: facilityId });
    if (!facility) throw new Error('Facility not found');
    return FacilityTypeormTransformer.toDto(facility);
  }
}
