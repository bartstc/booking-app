import {
  Contact,
  ContactPerson,
  Contacts,
  UniqueEntityID,
} from 'shared/domain';
import { Result } from 'shared/core';

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
  Slug,
  WorkingDay,
} from '../../../domain';
import { EnterpriseId } from '../../../../enterprise/domain';
import { EmployeeMap } from '../employee';
import { OfferMap } from '../offer';
import { BuildFacilityDto } from '../../BuildFacility.dto';

export class FacilityMap {
  public static entityToDomain(entity: any): Facility {
    const { description, contactPerson, contacts } = entity.details;

    const name = FacilityName.create({ value: entity.details.name });
    const slug = Slug.create({ value: entity.slug });
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
        slug: slug.getValue(),
        contactPerson: contactPerson
          ? ContactPerson.create(contactPerson).getValue()
          : null,
        contacts: Contacts.create(
          contacts?.length
            ? contacts.map(contact => Contact.create(contact).getValue())
            : [],
        ),
        address: address.getValue(),
        businessCategories,
        availability: availability.getValue(),
        employees: Employees.create(
          entity.employees.map(employee =>
            EmployeeMap.entityToDomain(employee),
          ),
        ),
        offers: Offers.create(
          entity.offers.map(offer => OfferMap.entityToDomain(offer)),
        ),
      },
      new UniqueEntityID(entity.facility_id),
    );

    if (!facilityOrError.isSuccess) {
      console.log(facilityOrError.error);
    }

    return facilityOrError.getValue();
  }

  public static dtoToDomain<T extends BuildFacilityDto>(
    dto: T,
    enterpriseId: string,
  ): Result<Facility> {
    const name = FacilityName.create({ value: dto.facilityName });
    const slug = Slug.create({ value: dto.slug });
    const address = Address.create(dto.address);
    const categories: BusinessCategory[] = [];

    dto.businessCategories.forEach(category => {
      categories.push(BusinessCategory.create(category).getValue());
    });

    const businessCategories = BusinessCategories.create(categories);
    const workingDays: WorkingDay[] = [];

    dto.availability.forEach(day => {
      workingDays.push(WorkingDay.create(day).getValue());
    });
    const availability = Availability.create(workingDays);

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
      slug: slug.getValue(),
      contactPerson: dto.contactPerson
        ? ContactPerson.create(dto.contactPerson).getValue()
        : null,
      contacts: Contacts.create(
        dto.contacts?.length
          ? dto.contacts.map(contact => Contact.create(contact).getValue())
          : [],
      ),
      address: address.getValue(),
      businessCategories,
      availability: availability.getValue(),
      employees: Employees.create(),
      offers: Offers.create(),
    });
  }

  public static toPersistence(facility: Facility): Partial<any> {
    return {
      facility_id: facility.facilityId.id.toString(),
      enterprise_id: facility.enterpriseId,
      slug: facility.slug.value,
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
