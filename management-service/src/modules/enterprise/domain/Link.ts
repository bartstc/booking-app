import { ValueObject } from 'shared/domain';
import { Guard, Result, TextValidator } from 'shared/core';

interface IProps {
  url: string;
}

export class Link extends ValueObject<IProps> {
  get url(): string {
    return this.props.url;
  }

  private constructor(props: IProps) {
    super(props);
  }

  public static create(props: IProps): Result<Link> {
    const nullGuard = Guard.againstNullOrUndefined(props.url, 'url');

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    if (!TextValidator.validateWebURL(props.url)) {
      return Result.fail({
        message: `Url {${props.url}} is not valid.`,
      });
    }

    return Result.ok(new Link(props));
  }
}
