import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { OwnerEmail } from './OwnerEmail';

interface IProps {
  email: OwnerEmail;
}

export class Owner extends ValueObject<IProps> {
  get ownerEmail() {
    return this.props.email;
  }

  public static create(props: IProps): Result<Owner> {
    const nullGuard = Guard.againstNullOrUndefined(props.email, 'owner.email');

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    return Result.ok(new Owner(props));
  }
}
