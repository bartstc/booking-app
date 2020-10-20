import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

interface IProps {
  value: string;
}

export class EnterpriseDescription extends ValueObject<IProps> {
  public static minLength = 1;
  public static maxLength = 9999;

  get value() {
    return this.props.value;
  }

  private constructor(props: IProps) {
    super(props);
  }

  public static create(props: IProps): Result<EnterpriseDescription> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      'enterpriseDescription',
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }

    const minGuardResult = Guard.againstAtLeast({
      numChars: this.minLength,
      argument: props.value,
      argumentName: 'enterpriseDescription',
    });
    const maxGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentName: 'enterpriseDescription',
    });

    if (!minGuardResult.succeeded) {
      return Result.fail(minGuardResult);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail(maxGuardResult);
    }

    return Result.ok(new EnterpriseDescription(props));
  }
}
