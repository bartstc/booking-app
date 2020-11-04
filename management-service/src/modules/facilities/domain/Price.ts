import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { PriceModel, IPrice } from './types';

export class Price extends ValueObject<IPrice> {
  get type() {
    return this.props.type;
  }

  get value() {
    return this.props.value;
  }

  public static isValidPriceModel(value: any) {
    return Object.values(PriceModel).some(model => model === value);
  }

  public static create(props: IPrice): Result<Price> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      {
        argument: props.type,
        argumentName: 'price.type',
      },
      {
        argument: props.value,
        argumentName: 'price.value',
      },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    if (!this.isValidPriceModel(props.type)) {
      return Result.fail({ message: 'price.type.invalid' });
    }

    return Result.ok(new Price(props));
  }
}
