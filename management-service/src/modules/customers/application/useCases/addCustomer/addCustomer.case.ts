import { Injectable } from '@nestjs/common';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';
import { Contact, Contacts, UniqueEntityID } from 'shared/domain';

import {
  Address,
  Customer,
  CustomerDescription,
  FullName,
} from '../../../domain';
import { CustomerRepository } from '../../../adapter';
import { AddCustomerErrors } from './addCustomer.errors';
import { AddCustomerDto } from './addCustomer.dto';
import { FacilityRepository } from '../../../../facilities/adapter';
import { FacilityId } from '../../../../facilities/domain';

export type AddCustomerResponse = Either<
  | AppError.ValidationError
  | AppError.UnexpectedError
  | AddCustomerErrors.FacilityNotFoundError,
  Result<Customer>
>;

@Injectable()
export class AddCustomerCase
  implements UseCase<AddCustomerDto, Promise<AddCustomerResponse>> {
  constructor(
    private customerRepository: CustomerRepository,
    private facilityRepository: FacilityRepository,
  ) {}

  async execute(
    dto: AddCustomerDto,
    facilityId: string,
  ): Promise<AddCustomerResponse> {
    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new AddCustomerErrors.FacilityNotFoundError());
      }

      const fullName = FullName.create({
        value: dto.fullName,
      }).getValue();
      const description = dto.description
        ? CustomerDescription.create({
            value: dto.description,
          }).getValue()
        : null;
      const contactList: Contact[] = [];

      dto.contacts.forEach(contact => {
        contactList.push(Contact.create(contact).getValue());
      });

      const contacts = Contacts.create(contactList);
      const address = Address.create(dto.address).getValue();

      const newCustomerOrError = Customer.create({
        facilityId: FacilityId.create(
          new UniqueEntityID(facilityId),
        ).getValue(),
        fullName,
        address,
        description,
        birthDate: dto.birthDate,
        contacts,
      });

      if (!newCustomerOrError.isSuccess) {
        return left(Result.fail(newCustomerOrError.error));
      }

      const customer = newCustomerOrError.getValue();
      const entity = await this.customerRepository.persistModel(customer);
      await entity.save();

      return right(Result.ok(customer));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
