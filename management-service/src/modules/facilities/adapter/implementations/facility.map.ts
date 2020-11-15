import { Mapper } from 'shared/core';
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
  Employee,
  Employees,
  Facility,
  FacilityDescription,
  FacilityName,
  Offer,
  Offers,
  WorkingDay,
} from '../../domain';
import { FacilityEntity } from '../../infra/entities';
import { EnterpriseId } from '../../../enterprise/domain';
import { FacilityDto } from '../../application/dtos';

export class FacilityMap implements Mapper<Facility> {
  public static toDomain(
    entity: FacilityEntity,
    employees: Employee[],
    offers: Offer[],
  ): Facility {
    const { description, contactPerson, contacts } = entity.details;

    const name = FacilityName.create({ value: entity.details.name });
    const address = Address.create(entity.details.address);
    const categories: BusinessCategory[] = [];

    entity.details.businessCategories.forEach(category => {
      categories.push(BusinessCategory.create(category).getValue());
    });

    const businessCategories = BusinessCategories.create(categories);
    const workingDays: WorkingDay[] = [];

    entity.details.workingDays.forEach(day => {
      workingDays.push(WorkingDay.create(day).getValue());
    });
    const availability = Availability.create(workingDays);

    const facilityOrError = Facility.create(
      {
        enterpriseId: EnterpriseId.create(
          new UniqueEntityID(entity.enterprise_id),
        ).getValue(),
        name: name.getValue(),
        description: description
          ? FacilityDescription.create({ value: description }).getValue()
          : null,
        contactPerson: contactPerson
          ? ContactPerson.create(contactPerson).getValue()
          : null,
        contacts: Contacts.create(
          contacts.length
            ? contacts.map(contact => Contact.create(contact).getValue())
            : [],
        ),
        address: address.getValue(),
        businessCategories,
        availability: availability.getValue(),
        employees: Employees.create(employees),
        offers: Offers.create(offers),
      },
      new UniqueEntityID(entity.facility_id),
    );

    if (!facilityOrError.isSuccess) {
      console.log(facilityOrError.error);
    }

    return facilityOrError.getValue();
  }

  public static rawToDto(facility: FacilityEntity): FacilityDto {
    return {
      facilityId: facility.facility_id,
      enterpriseId: facility.enterprise_id,
      name: facility.details.name,
      description: facility.details.description,
      address: facility.details.address,
      contactPerson: facility.details.contactPerson,
      contacts: facility.details.contacts,
      businessCategories: facility.details.businessCategories,
      workingDays: facility.details.workingDays,
    };
  }

  public static modelToPersistence(
    facility: Facility,
  ): Partial<FacilityEntity> {
    return {
      facility_id: facility.facilityId.id.toString(),
      enterprise_id: facility.enterpriseId,
      offer_ids: facility.offers
        .getItems()
        .map(offer => offer.offerId.id.toString()),
      employee_ids: facility.employees
        .getItems()
        .map(employee => employee.employeeId.id.toString()),
      details: {
        name: facility.name.value,
        description: facility.description?.value ?? null,
        address: facility.address.props,
        contactPerson: facility.contactPerson.allContacts,
        contacts: facility.contacts.getItems().map(contact => contact.props),
        businessCategories: facility.businessCategories
          .getItems()
          .map(category => category.props),
        workingDays: facility.availability
          .getItems()
          .map(workingDay => workingDay.props),
      },
    };
  }
}
