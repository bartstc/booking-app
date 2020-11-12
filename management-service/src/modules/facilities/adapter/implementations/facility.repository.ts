import { EntityRepository, Repository } from 'typeorm/index';
import { InjectRepository } from '@nestjs/typeorm';

import { FacilityEntity } from '../../infra/entities';
import { FacilityRepo } from '../facilityRepo';
import { Facility } from '../../domain';
import { FacilityMap } from './facility.map';
import { OfferRepository } from './offer.repository';
import { EmployeeRepository } from './employee.repository';

@EntityRepository(FacilityEntity)
export class FacilityRepository extends Repository<FacilityEntity>
  implements FacilityRepo {
  constructor(
    @InjectRepository(OfferRepository)
    private offerRepository: OfferRepository,
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
  ) {
    super();
  }

  async exists(facilityId: string): Promise<boolean> {
    const existingFacility = await this.createQueryBuilder(
      'facility',
    ).where('facility.facility_id = "facilityId', { facilityId });

    return !!existingFacility;
  }

  async getFacilityById(facilityId: string): Promise<Facility> {
    const facility = await this.getRawFacilityById(facilityId);
    if (!facility) throw new Error('Facility not found');

    const employees = await this.employeeRepository.getAllEmployees(facilityId);
    const offers = await this.offerRepository.getAllOffers(facilityId);

    return FacilityMap.toDomain(facility, employees, offers);
  }

  async getRawFacilityById(facilityId: string): Promise<FacilityEntity> {
    const facility = await this.findOne({ facility_id: facilityId });
    if (!facility) throw new Error('Facility not found');
    return facility;
  }

  async persistModel(facility: Facility): Promise<void> {
    await this.create(FacilityMap.modelToPersistence(facility)).save();
  }

  async deleteFacility(facilityId: string): Promise<void> {
    const result = await this.delete({ facility_id: facilityId });

    if (result.affected === 0) {
      throw new Error(`Facility with id ${facilityId} not found`);
    }
  }
}
