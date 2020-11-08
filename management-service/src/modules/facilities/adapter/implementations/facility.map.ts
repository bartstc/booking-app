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

    entity.workingDays.forEach(day => {
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
        contacts: contacts.length
          ? Contacts.create(
              contacts.map(contact => Contact.create(contact).getValue()),
            )
          : null,
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

  public static modelToPersistence(
    facility: Facility,
  ): Partial<FacilityEntity> {
    return {
      facility_id: facility.facilityId.id.toString(),
      enterprise_id: facility.enterpriseId,
      offerIds: facility.offers
        .getItems()
        .map(offer => offer.offerId.id.toString()),
      employeeIds: facility.employees
        .getItems()
        .map(employee => employee.employeeId.id.toString()),
      workingDays: facility.availability
        .getItems()
        .map(workingDay => workingDay.props),
      details: {
        name: facility.name.value,
        description: facility.description.value,
        address: facility.address.props,
        contactPerson: facility.contactPerson.allContacts,
        contacts: facility.contacts.getItems().map(contact => contact.props),
        businessCategories: facility.businessCategories
          .getItems()
          .map(category => category.props),
      },
    };
  }
}
