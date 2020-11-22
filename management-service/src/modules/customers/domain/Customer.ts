import { CustomDecorator } from '@nestjs/common';

import { Contacts, Entity, UniqueEntityID } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { FullName } from './FullName';
import { Address } from './Address';

interface IProps {
  fullName: FullName;
  description: CustomDecorator;
  birthDate: string;
  contacts: Contacts;
  address: Address;
}

export class Customer extends Entity<IProps> {
  get fullName() {
    return this.props.fullName;
  }

  get description() {
    return this.props.description;
  }

  get birthDate() {
    return this.props.birthDate;
  }

  get contacts() {
    return this.props.contacts;
  }

  get address() {
    return this.props.address;
  }

  public static create(props: IProps, id?: UniqueEntityID): Result<Customer> {
    const nullGuard = Guard.againstNullOrUndefined(
      props.birthDate,
      'birthDate',
    );

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    return Result.ok(new Customer(props, id));
  }
}
