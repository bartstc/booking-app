import { uniq, sum } from 'lodash';
import { Currency } from 'types';

export class Money {
  private constructor(private value: number, private currency: Currency) {}

  static from(value: number, currency: Currency) {
    return new Money(value, currency);
  }

  static total(prices: Array<Money>) {
    if (prices.length === 0) {
      return 0;
    }

    if (prices.length === 1) {
      return prices[0].value;
    }

    Money.checkCurrency(prices);
    return sum(prices.map(money => money.value));
  }

  add(another: Money) {
    Money.checkCurrency([this, another]);
    return new Money(this.value + another.value, this.currency);
  }

  subtract(another: Money) {
    Money.checkCurrency([this, another]);
    return new Money(this.value - another.value, this.currency);
  }

  static checkCurrency(prices: Array<Money>) {
    if (uniq(prices).length !== 1) {
      throw new Error('Currency is not the same');
    }
  }

  multiply(factor: number) {
    return new Money(this.value * factor, this.currency);
  }

  getValue() {
    return this.value;
  }

  getCurrency() {
    return this.currency;
  }
}
