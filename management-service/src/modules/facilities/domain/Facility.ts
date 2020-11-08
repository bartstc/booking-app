import { ContactPerson, Contacts, Entity, UniqueEntityID } from 'shared/domain';
import { Result } from 'shared/core';

import { FacilityName } from './FacilityName';
import { FacilityId } from './FacilityId';
import { EnterpriseId } from '../../enterprise/domain';
import { FacilityDescription } from './FacilityDescription';
import { Address } from './Address';
import { BusinessCategories } from './BusinessCategories';
import { Employees } from './Employees';
import { Offers } from './Offers';
import { Availability } from './Availability';

interface IProps {
  enterpriseId: EnterpriseId;
  name: FacilityName;
  description: FacilityDescription | null;
  contactPerson: ContactPerson | null;
  address: Address;
  businessCategories: BusinessCategories;
  contacts: Contacts | null;
  employees: Employees;
  offers: Offers;
  availability: Availability;
}

export class Facility extends Entity<IProps> {
  get facilityId() {
    return FacilityId.create(this._id).getValue();
  }

  get enterpriseId() {
    return this.props.enterpriseId.id.toString();
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get contactPerson() {
    return this.props.contactPerson;
  }

  get address() {
    return this.props.address;
  }

  get businessCategories() {
    return this.props.businessCategories;
  }

  get contacts() {
    return this.props.contacts;
  }

  get employees() {
    return this.props.employees;
  }

  get offers() {
    return this.props.offers;
  }

  get availability() {
    return this.props.availability;
  }

  public static create(props: IProps, id?: UniqueEntityID): Result<Facility> {
    return Result.ok(new Facility(props, id));
  }
}
