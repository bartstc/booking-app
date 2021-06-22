using System.Collections.Generic;
using Core.Domain;

namespace Accessibility.Domain.SharedKernel
{
    public class Money : ValueObject
    {
        public decimal Value { get; }
        public string Currency { get; }

        private Money(decimal value, string currency)
        {
            Value = value;
            Currency = currency;
        }

        public static Money Of(decimal value, string currency)
        {
            CheckRule(new MoneyMustHaveCurrencyRule(currency));
            return new Money(value, currency);
        }

        public static Money operator +(Money money1, Money money2)
        {
            CheckRule(new MoneyOperationsMustHaveSameCurrenciesRule(money1, money2));
            return new Money(money1.Value + money2.Value, money1.Currency);
        }

        protected override IEnumerable<object> GetEqualityComponents() =>
            new List<object> { Value, Currency };
    }
}