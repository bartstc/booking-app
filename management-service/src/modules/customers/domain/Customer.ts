import { AggregateRoot, Contacts, UniqueEntityID } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { FullName } from './FullName';
import { Address } from './Address';
import { CustomerId } from './CustomerId';
import { CustomerDescription } from './CustomerDescription';
import { FacilityId } from '../../facilities/domain';

interface IProps {
  facilityId: FacilityId;
  fullName: FullName;
  contacts: Contacts;
  address: Address;
  description: CustomerDescription | null;
  birthDate: Date;
  isSystemic: boolean;
}

export class Customer extends AggregateRoot<IProps> {
  get customerId() {
    return CustomerId.create(this._id).getValue();
  }

  get facilityId() {
    return this.props.facilityId.id.toString();
  }

  get isSystemic() {
    return this.props.isSystemic;
  }

  get fullName() {
    return this.props.fullName;
  }

  get description() {
    return this.props.description ? this.props.description : null;
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
