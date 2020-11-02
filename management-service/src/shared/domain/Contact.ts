import { ValueObject } from './ValueObject';
import { ContactType, IContact } from './types';
import { Guard, Result, TextValidator } from '../core';

export class Contact extends ValueObject<IContact> {
  get value() {
    return this.props.value;
  }

  get type() {
    return this.props.type;
  }

  public static validateContact(value: string, type: ContactType) {
    switch (type) {
      case ContactType.Email:
      case ContactType.Fax:
        return TextValidator.validateEmailAddress(value);
      case ContactType.Phone:
        return TextValidator.validatePhoneNumber(value);
      case ContactType.Url:
        return TextValidator.validateWebURL(value);
      default:
        throw new Error(`${type} is unknown contact type`);
    }
  }

  public static create(props: IContact): Result<Contact> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      {
        argument: props.type,
        argumentName: 'contact.type',
      },
      {
        argument: props.value,
        argumentName: 'contact.value',
      },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    const typeGuard = Guard.isOneOf({
      value: props.type,
      validValues: Object.values(ContactType),
      argumentName: 'contact.type',
    });

    if (!typeGuard.succeeded) {
      return Result.fail(typeGuard);
    }

    if (!this.validateContact(props.value, props.type)) {
      return Result.fail({
        message: `${props.value} is invalid value for type ${props.type}`,
      });
    }

    return Result.ok(new Contact(props));
  }
}
