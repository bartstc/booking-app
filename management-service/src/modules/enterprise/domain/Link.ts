import { ValueObject } from 'shared/domain';
import { Guard, Result, TextValidator } from 'shared/core';

interface IProps {
  value: string;
}

export class Link extends ValueObject<IProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IProps) {
    super(props);
  }

  public static create(props: IProps): Result<Link> {
    const nullGuard = Guard.againstNullOrUndefined(props.value, 'url');

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    if (!TextValidator.validateWebURL(props.value)) {
      return Result.fail({
        message: `Url {${props.value}} is not valid.`,
      });
    }

    return Result.ok(new Link(props));
  }
}
