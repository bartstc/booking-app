import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { Price } from './Price';

interface IProps {
  duration: number;
  price: Price;
}

export class OfferVariant extends ValueObject<IProps> {
  get duration() {
    return this.props.duration;
  }

  get price() {
    return this.props.price;
  }

  public static create(props: IProps): Result<OfferVariant> {
    const nullGuard = Guard.againstNullOrUndefined(
      props.duration,
      'offerVariant.duration',
    );

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    const numberGuard = Guard.isNumber(props.duration, 'offerVariant.duration');

    if (!numberGuard.succeeded) {
      return Result.fail(numberGuard);
    }

    return Result.ok(new OfferVariant(props));
  }
}
