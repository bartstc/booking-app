import { Contact, Contacts, UniqueEntityID } from 'shared/domain';
import { Result } from 'shared/core';

import { Address, Customer, CustomerDescription, FullName } from '../domain';
import { BuildCustomerDto } from './BuildCustomer.dto';
import { FacilityId } from '../../facilities/domain';

export class CustomerMap {
  public static entityToDomain(entity: any): Customer {
    const facilityId = FacilityId.create(
      new UniqueEntityID(entity.facility_id),
    ).getValue();
    const fullName = FullName.create({
      value: entity.details.fullName,
    }).getValue();
    const description = entity.details.description
      ? CustomerDescription.create({
          value: entity.details.description,
        }).getValue()
      : null;
    const contactList: Contact[] = [];

    entity.details.contacts.forEach((contact) => {
      contactList.push(Contact.create(contact).getValue());
    });

    const contacts = Contacts.create(contactList);
    const address = Address.create(entity.details.address).getValue();

    const customerOrError = Customer.create(
      {
        facilityId,
        fullName,
        address,
        description,
        birthDate: entity.details.birthDate,
        isSystemic: entity.is_systemic,
        contacts,
      },
      new UniqueEntityID(entity.customer_id),
    );

    if (!customerOrError.isSuccess) {
      console.log(customerOrError.error);
    }

    return customerOrError.getValue();
  }

  public static dtoToDomain<T extends BuildCustomerDto>(
    dto: T,
    facilityId: string,
    isSystemic: boolean,
  ): Result<Customer> {
    const fullName = FullName.create({
      value: dto.fullName,
    }).getValue();
    const description = dto.description
      ? CustomerDescription.create({
          value: dto.description,
        }).getValue()
      : null;
    const contactList: Contact[] = [];

    dto.contacts.forEach((contact) => {
      contactList.push(Contact.create(contact).getValue());
    });

    const contacts = Contacts.create(contactList);
    const address = Address.create(dto.address).getValue();

    return Customer.create({
      facilityId: FacilityId.create(new UniqueEntityID(facilityId)).getValue(),
      fullName,
      address,
      description,
      birthDate: dto.birthDate,
      isSystemic,
      contacts,
    });
  }

  public static toPersistence(customer: Customer): Partial<any> {
    return {
      customer_id: customer.customerId.id.toString(),
      facility_id: customer.facilityId,
      is_systemic: customer.isSystemic,
      details: {
        fullName: customer.fullName.value,
        description: customer.description ? customer.description.value : null,
        birthDate: customer.birthDate,
        address: customer.address.props,
        contacts: customer.contacts.getItems().map((contact) => contact.props),
      },
    };
  }
}
