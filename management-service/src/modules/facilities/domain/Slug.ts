import { ValueObject } from 'shared/domain';
import { Guard, Result, TextValidator } from 'shared/core';

interface IProps {
  value: string;
}

export class Slug extends ValueObject<IProps> {
  public static minLength = 1;
  public static maxLength = 50;

  get value() {
    return this.props.value;
  }

  private constructor(props: IProps) {
    super(props);
  }

  public static create(props: IProps): Result<Slug> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'slug');

    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }

    const minGuardResult = Guard.againstAtLeast({
      numChars: this.minLength,
      argument: props.value,
      argumentName: 'slug',
    });
    const maxGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.value,
      argumentName: 'slug',
    });

    if (!minGuardResult.succeeded) {
      return Result.fail(minGuardResult);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail(maxGuardResult);
    }

    return Result.ok(new Slug({ value: TextValidator.slugify(props.value) }));
  }
}
