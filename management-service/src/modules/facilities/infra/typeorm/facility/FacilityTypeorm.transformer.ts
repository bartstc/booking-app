import { FacilityDto } from '../../../application/dto';
import { FacilityEntity } from './Facility.entity';

export class FacilityTypeormTransformer {
  public static toDto(facility: FacilityEntity): FacilityDto {
    return {
      facilityId: facility.facility_id,
      enterpriseId: facility.enterprise_id,
      name: facility.details.name,
      currency: facility.details.currency,
      description: facility.details.description,
      slug: facility.slug,
      address: facility.details.address,
      contactPerson: facility.details.contactPerson,
      contacts: facility.details.contacts,
      businessCategories: facility.details.businessCategories,
      workingDays: facility.details.workingDays,
    };
  }

  public static toDtoBulk(facilities: FacilityEntity[]): FacilityDto[] {
    return facilities.map((facility) => this.toDto(facility));
  }
}
