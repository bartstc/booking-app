import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

interface IProps {
  value: string;
}

export class OwnerEmail extends ValueObject<IProps> {
  public static minLength = 1;
  public static maxLength = 999;

  get value() {
    return this.props.value;
  }

  private constructor(props: IProps) {
    super(props);
  }

  public static create(props: IProps): Result<OwnerEmail> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      'ownerEmail',
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }

    const minGuardResult = Guard.againstAtLeast({
      numChars: this.minLength,
      argument: props.value,
      argumentName: 'ownerEmail',
    });
    const maxGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentName: 'ownerEmail',
    });

    if (!minGuardResult.succeeded) {
      return Result.fail(minGuardResult);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail(maxGuardResult);
    }

    return Result.ok(new OwnerEmail(props));
  }
}
