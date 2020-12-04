import { Contact, Contacts, UniqueEntityID } from 'shared/domain';

import { Address, Customer, CustomerDescription, FullName } from '../../domain';
import { CustomerEntity } from './Customer.entity';
import { FacilityId } from '../../../facilities/domain';

export class CustomerMap {
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

  public static toPersistence(customer: Customer): Partial<CustomerEntity> {
    return {
      customer_id: customer.customerId.id.toString(),
      facility_id: customer.facilityId,
      details: {
        fullName: customer.fullName.value,
        description: customer.description ? customer.description.value : null,
        birthDate: customer.birthDate,
        address: customer.address.props,
        contacts: customer.contacts.getItems().map(contact => contact.props),
      },
    };
  }
}
