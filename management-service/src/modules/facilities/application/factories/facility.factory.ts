import { Injectable } from '@nestjs/common';

import { Result } from 'shared/core';
import {
  Contact,
  ContactPerson,
  Contacts,
  UniqueEntityID,
} from 'shared/domain';

import {
  Address,
  Availability,
  BusinessCategories,
  BusinessCategory,
  Employees,
  Facility,
  FacilityDescription,
  FacilityName,
  Offers,
  WorkingDay,
} from '../../domain';
import { EnterpriseId } from '../../../enterprise/domain';
import { FacilityBuilderDto } from '../dtos';
import {
  EmployeeRepository,
  FacilityMap,
  FacilityRepository,
  OfferRepository,
} from '../../adapter';

@Injectable()
export class FacilityFactory {
  constructor(
    private facilityRepository: FacilityRepository,
    private offerRepository: OfferRepository,
    private employeeRepository: EmployeeRepository,
  ) {}

  public buildFromDto<T extends FacilityBuilderDto>(
    dto: T,
    enterpriseId: string,
  ): Result<Facility> {
    const name = FacilityName.create({ value: dto.facilityName });
    const address = Address.create(dto.address);
    const businessCategories = BusinessCategories.create(
      dto.businessCategories.map(category =>
        BusinessCategory.create(category).getValue(),
      ),
    );
    const contacts = Contacts.create(
      dto.contacts
        ? dto.contacts.map(contact => Contact.create(contact).getValue())
        : undefined,
    );
    const availability = Availability.create(
      dto.availability.map(workingDay =>
        WorkingDay.create(workingDay).getValue(),
      ),
    );

    return Facility.create({
      enterpriseId: EnterpriseId.create(
        new UniqueEntityID(enterpriseId),
      ).getValue(),
      name: name.getValue(),
      description: dto.facilityDescription
        ? FacilityDescription.create({
            value: dto.facilityDescription,
          }).getValue()
        : null,
      contactPerson: dto.contactPerson
        ? ContactPerson.create(dto.contactPerson).getValue()
        : null,
      address: address.getValue(),
      businessCategories,
      contacts,
      availability: availability.getValue(),
      employees: Employees.create(),
      offers: Offers.create(),
    });
  }

  public async buildFromRepository(facilityId: string) {
    const facility = await this.facilityRepository.getRawFacilityById(
      facilityId,
    );
    if (!facility) throw new Error('Facility not found');

    const offers = await this.offerRepository.getAllOffers(facilityId);
    const employees = await this.employeeRepository.getAllEmployees(facilityId);

    return FacilityMap.toDomain(facility, employees, offers);
  }
}
