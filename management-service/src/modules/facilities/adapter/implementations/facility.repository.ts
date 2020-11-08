import { EntityRepository, Repository } from 'typeorm/index';
import { FacilityEntity } from '../../infra/entities';
import { FacilityRepo } from '../facilityRepo';
import { Facility } from '../../domain';
import { FacilityMap } from './facility.map';
import { OfferRepository } from './offer.repository';
import { InjectRepository } from '@nestjs/typeorm';
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
    const facility = await this.findOne({ facility_id: facilityId });
    if (!facility) throw new Error('Facility not found');

    const employees = await this.employeeRepository.getEmployees(
      facility.employeeIds,
    );
    const offers = await this.offerRepository.getOffers(facility.offerIds);

    return FacilityMap.toDomain(facility, employees, offers);
  }

  async persistModel(facility: Facility): Promise<void> {
    await this.create(FacilityMap.modelToPersistence(facility)).save();
  }
}
