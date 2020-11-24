import { Mapper } from 'shared/core';
import { Contact, Contacts, UniqueEntityID } from 'shared/domain';

import { Address, Customer, CustomerDescription, FullName } from '../../domain';
import { CustomerEntity } from '../../infra/entities';
import { CustomerDto } from '../../application/dtos';
import { FacilityId } from '../../../facilities/domain';

export class CustomerMap implements Mapper<Customer> {
  public static entityToDomain(entity: CustomerEntity): Customer {
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

    entity.details.contacts.forEach(contact => {
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
        contacts,
      },
      new UniqueEntityID(entity.customer_id),
    );

    if (!customerOrError.isSuccess) {
      console.log(customerOrError.error);
    }

    return customerOrError.getValue();
  }

  public static rawToDtoBulk(entities: CustomerEntity[]): CustomerDto[] {
    return entities.map(entity => this.rawToDto(entity));
  }

  public static rawToDto(entity: CustomerEntity): CustomerDto {
    return {
      customerId: entity.customer_id,
      facilityId: entity.facility_id,
      ...entity.details,
    };
  }

  public static modelToPersistence(
    customer: Customer,
  ): Partial<CustomerEntity> {
    return {
      customer_id: customer.customerId.id.toString(),
      facility_id: customer.facilityId.id.toString(),
      details: {
        fullName: customer.fullName.value,
        description: customer.description ? customer.description.value : null,
        birthDate: customer.birthDate,
        address: customer.address.props,
        contacts: customer.contacts.getItems(),
      },
    };
  }
}
