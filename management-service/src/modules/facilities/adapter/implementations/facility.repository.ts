import { EntityRepository, Repository } from 'typeorm/index';

import { FacilityEntity } from '../../infra/entities';
import { FacilityRepo } from '../facilityRepo';
import { Facility } from '../../domain';
import { FacilityMap } from './facility.map';

@EntityRepository(FacilityEntity)
export class FacilityRepository extends Repository<FacilityEntity>
  implements FacilityRepo {
  constructor() {
    super();
  }

  async exists(facilityId: string): Promise<boolean> {
    try {
      await this.getRawFacilityById(facilityId);
    } catch {
      return false;
    }

    return true;
  }

  async slugExists(slug: string): Promise<boolean> {
    try {
      await this.getRawFacilityBySlug(slug);
    } catch {
      return false;
    }

    return true;
  }

  async getRawFacilityBySlug(slug: string): Promise<FacilityEntity> {
    const facility = await this.findOne({ slug });
    if (!facility) throw new Error('Facility not found');
    return facility;
  }

  async getRawFacilityById(facilityId: string): Promise<FacilityEntity> {
    const facility = await this.findOne({ facility_id: facilityId });
    if (!facility) throw new Error('Facility not found');
    return facility;
  }

  async persistModel(facility: Facility): Promise<FacilityEntity> {
    return this.create(FacilityMap.modelToPersistence(facility));
  }

  async deleteFacility(facilityId: string): Promise<void> {
    const result = await this.delete({ facility_id: facilityId });

    if (result.affected === 0) {
      throw new Error(`Facility with id ${facilityId} not found`);
    }
  }
}
