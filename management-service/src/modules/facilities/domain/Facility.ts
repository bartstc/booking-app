import {
  AggregateRoot,
  ContactPerson,
  Contacts,
  UniqueEntityID,
} from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { FacilityName } from './FacilityName';
import { FacilityId } from './FacilityId';
import { EnterpriseId } from '../../enterprise/domain';
import { FacilityDescription } from './FacilityDescription';
import { Address } from './Address';
import { BusinessCategories } from './BusinessCategories';
import { Offers } from './Offers';
import { Availability } from './Availability';
import { Offer } from './Offer';
import { Slug } from './Slug';
import { Currency } from './types';

interface IProps {
  enterpriseId: EnterpriseId;
  name: FacilityName;
  slug: Slug;
  description: FacilityDescription | null;
  contactPerson: ContactPerson | null;
  address: Address;
  businessCategories: BusinessCategories;
  contacts: Contacts;
  offers: Offers;
  availability: Availability;
  currency: Currency;
}

export class Facility extends AggregateRoot<IProps> {
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

  get slug() {
    return this.props.slug;
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

  get offers() {
    return this.props.offers;
  }

  get availability() {
    return this.props.availability;
  }

  get currency() {
    return this.props.currency;
  }

  public addOffer(offer: Offer) {
    this.offers.add(offer);
  }

  public removeOffer(offer: Offer) {
    offer.remove();
    this.offers.remove(offer);
  }

  public static create(props: IProps, id?: UniqueEntityID): Result<Facility> {
    const nullGuard = Guard.againstNullOrUndefined(
      props.currency,
      'facility.currency',
    );

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }
    return Result.ok(new Facility(props, id));
  }
}
