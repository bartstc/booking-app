import { Entity, UniqueEntityID } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { OfferId } from './OfferId';
import { FacilityId } from './FacilityId';
import { OfferName } from './OfferName';
import { OfferVariants } from './OfferVariants';
import {
  CannotRemoveActiveOfferGuard,
  OfferIsAlreadyActiveGuard,
  OfferIsAlreadyInactiveGuard,
} from './guards';
import { OfferStatus } from './types';

interface IProps {
  facilityId: FacilityId;
  status: OfferStatus;
  name: OfferName;
  variants: OfferVariants;
  isRemoved?: boolean;
}

export class Offer extends Entity<IProps> {
  get offerId() {
    return OfferId.create(this._id).getValue();
  }

  get facilityId() {
    return this.props.facilityId.id.toString();
  }

  get status() {
    return this.props.status;
  }

  get name() {
    return this.props.name;
  }

  get variants() {
    return this.props.variants;
  }

  get isActive() {
    return this.status === OfferStatus.Active;
  }

  public activate() {
    if (this.isActive) {
      throw new OfferIsAlreadyActiveGuard();
    }

    this.props.status = OfferStatus.Active;
  }

  public deactivate() {
    if (!this.isActive) {
      throw new OfferIsAlreadyInactiveGuard();
    }

    this.props.status = OfferStatus.Inactive;
  }

  public remove() {
    if (this.isActive) {
      throw new CannotRemoveActiveOfferGuard();
    }

    this.props.isRemoved = true;
  }

  public static create(props: IProps, id?: UniqueEntityID): Result<Offer> {
    const nullGuard = Guard.againstNullOrUndefined(
      props.status,
      'offer.status',
    );

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    return Result.ok(new Offer(props, id));
  }
}
