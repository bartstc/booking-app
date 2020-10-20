import validator from 'validator';
import { sanitize } from 'dompurify';

export class TextValidator {
  public static sanitize(unsafeText: string) {
    return sanitize(unsafeText);
  }

  public static validateWebURL(url: string) {
    return validator.isURL(url);
  }

  public static validateEmailAddress(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  public static validatePhoneNumber(phone: string) {
    const re = /^(\+\d{1,3}(\s){0,1}\d+(\-\d+)*((\s)\/(\s)?(\+\d{1,3}\s)?\d+(\-\d+)*)*)$/;
    return re.test(phone);
  }

  public static createRandomNumericString(numberDigits: number): string {
    const chars = '0123456789';
    let value = '';

    for (let i = numberDigits; i > 0; --i) {
      value += chars[Math.round(Math.random() * (chars.length - 1))];
    }

    return value;
  }
}
