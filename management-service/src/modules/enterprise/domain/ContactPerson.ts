import { ValueObject } from 'shared/domain';
import { Guard, Result, TextValidator } from 'shared/core';

import { IContactPerson } from './types';

export class ContactPerson extends ValueObject<IContactPerson> {
  public static minLength = 1;
  public static maxLength = 999;

  get name() {
    return this.props.name;
  }

  get phone() {
    return this.props.phone;
  }

  get fax() {
    return this.props.fax;
  }

  get email() {
    return this.props.email;
  }

  get allContacts() {
    return this.props;
  }

  public static create(props: IContactPerson): Result<ContactPerson> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      {
        argument: props.name,
        argumentName: 'contactName',
      },
      {
        argument: props.phone,
        argumentName: 'contactPhone',
      },
      {
        argument: props.fax,
        argumentName: 'contactFax',
      },
      {
        argument: props.email,
        argumentName: 'contactEmail',
      },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    const minGuardResult = Guard.againstAtLeast({
      numChars: this.minLength,
      argument: props.name,
      argumentName: 'contactName',
    });
    const maxGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.name,
      argumentName: 'contactName',
    });

    if (!minGuardResult.succeeded) {
      return Result.fail(minGuardResult);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail(maxGuardResult);
    }

    if (!TextValidator.validateEmailAddress(props.email)) {
      return Result.fail({
        message: `Email {${props.email}} is not valid.`,
      });
    }

    if (!TextValidator.validatePhoneNumber(props.phone)) {
      return Result.fail({
        message: `Phone {${props.phone}} is not valid.`,
      });
    }

    if (!TextValidator.validatePhoneNumber(props.fax)) {
      return Result.fail({
        message: `Fax {${props.phone}} is not valid.`,
      });
    }

    return Result.ok(new ContactPerson(props));
  }
}
