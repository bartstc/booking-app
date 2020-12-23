import { Entity, UniqueEntityID } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { OfferId } from './OfferId';
import { FacilityId } from './FacilityId';
import { OfferName } from './OfferName';
import { OfferVariants } from './OfferVariants';
import {
  OfferIsAlreadyActiveGuard,
  OfferIsAlreadyInactiveGuard,
} from './guards';

interface IProps {
  facilityId: FacilityId;
  isActive: boolean;
  name: OfferName;
  variants: OfferVariants;
}

export class Offer extends Entity<IProps> {
  get offerId() {
    return OfferId.create(this._id).getValue();
  }

  get facilityId() {
    return this.props.facilityId.id.toString();
  }

  get isActive() {
    return this.props.isActive;
  }

  get name() {
    return this.props.name;
  }

  get variants() {
    return this.props.variants;
  }

  public activate() {
    if (this.isActive) {
      throw new OfferIsAlreadyActiveGuard();
    }

    this.props.isActive = true;
  }

  public deactivate() {
    if (!this.isActive) {
      throw new OfferIsAlreadyInactiveGuard();
    }

    this.props.isActive = false;
  }

  public static create(props: IProps, id?: UniqueEntityID): Result<Offer> {
    const nullGuard = Guard.againstNullOrUndefined(props.isActive, 'isActive');

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    return Result.ok(new Offer(props, id));
  }
}
