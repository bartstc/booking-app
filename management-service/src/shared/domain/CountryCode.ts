import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { countryCodes } from '../../resources/countryCodes';

interface IProps {
  value: string;
}

export class CountryCode extends ValueObject<IProps> {
  get value() {
    return this.props.value;
  }

  private constructor(props: IProps) {
    super(props);
  }

  public static create(props: IProps): Result<CountryCode> {
    const guardResult = Guard.isOneOf({
      value: props.value,
      argumentName: 'countryCode',
      validValues: countryCodes.map((countryCode) => countryCode.code),
    });

    if (!guardResult.succeeded) {
      return Result.fail(guardResult);
    }

    return Result.ok(new CountryCode(props));
  }
}
