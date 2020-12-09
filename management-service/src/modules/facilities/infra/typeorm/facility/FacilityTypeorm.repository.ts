import { EntityRepository, Repository } from 'typeorm/index';

import { FacilityRepository } from '../../../domain/repositories';
import { Facility, Slug } from '../../../domain';
import { FacilityMap } from './Facility.map';
import { FacilityEntity } from './Facility.entity';

@EntityRepository(FacilityEntity)
export class FacilityTypeormRepository extends Repository<FacilityEntity>
  implements FacilityRepository {
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

  async slugExists(slug: Slug): Promise<boolean> {
    try {
      await this.getRawFacilityBySlug(slug.value);
    } catch {
      return false;
    }

    return true;
  }

  async getFacilityById(facilityId: string): Promise<Facility> {
    const entity = await this.getRawFacilityById(facilityId);
    return FacilityMap.entityToDomain(entity);
  }

  async persist(facility: Facility): Promise<FacilityEntity> {
    return this.create(FacilityMap.toPersistence(facility));
  }

  async deleteFacility(facilityId: string): Promise<void> {
    const result = await this.delete({ facility_id: facilityId });

    if (result.affected === 0) {
      throw new Error(`Facility with id ${facilityId} not found`);
    }
  }

  private async getRawFacilityBySlug(slug: string): Promise<FacilityEntity> {
    const facility = await this.findOne({ slug });
    if (!facility) throw new Error('Facility not found');
    return facility;
  }

  private async getRawFacilityById(
    facilityId: string,
  ): Promise<FacilityEntity> {
    const facility = await this.findOne({ facility_id: facilityId });
    if (!facility) throw new Error('Facility not found');
    return facility;
  }
}
