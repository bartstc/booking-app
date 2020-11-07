import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { PriceModel, IPrice } from './types';
import { Currency } from './types/Currency';

export class Price extends ValueObject<IPrice> {
  get type() {
    return this.props.type;
  }

  get value() {
    return this.props.value;
  }

  get currency() {
    return this.props.currency;
  }

  public static isValidPriceModel(value: any) {
    return Object.values(PriceModel).some(model => model === value);
  }

  public static isValidCurrency(value: string) {
    return Object.values(Currency).some(curr => curr === value);
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
      {
        argument: props.currency,
        argumentName: 'price.currency',
      },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    if (!this.isValidPriceModel(props.type)) {
      return Result.fail({ message: 'price.type.invalid' });
    }

    if (!this.isValidCurrency(props.currency)) {
      return Result.fail({ message: 'price.currency.invalid' });
    }

    return Result.ok(new Price(props));
  }
}
