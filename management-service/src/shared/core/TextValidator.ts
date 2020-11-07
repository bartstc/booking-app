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

  public static validateDate(date: string) {
    const re = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(re)) return false; // Invalid format
    const d = new Date(date);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === date;
  }

  public static validateHour(time: string) {
    const re = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    return !!time.match(re);
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
