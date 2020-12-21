import { IContactPerson, ValueObject } from 'shared/domain/index';
import { Guard, Result, TextValidator } from 'shared/core';

export class ContactPerson extends ValueObject<IContactPerson> {
  public static minLength = 1;
  public static maxLength = 999;

  get allContacts() {
    return this.props;
  }

  public static create(props: IContactPerson): Result<ContactPerson> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      {
        argument: props.name,
        argumentName: 'contactPerson.name',
      },
      {
        argument: props.phone,
        argumentName: 'contactPerson.phone',
      },
      {
        argument: props.fax,
        argumentName: 'contactPerson.fax',
      },
      {
        argument: props.email,
        argumentName: 'contactPerson.email',
      },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    const minGuardResult = Guard.againstAtLeast({
      numChars: this.minLength,
      argument: props.name,
      argumentName: 'contactPerson.name',
    });
    const maxGuardResult = Guard.againstAtMost({
      numChars: this.maxLength,
      argument: props.name,
      argumentName: 'contactPerson.name',
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
