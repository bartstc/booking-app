using System;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;
using Xunit;

namespace Accessibility.UnitTests.SharedKernel
{
    public class MoneyTests
    {
        [Theory]
        [InlineData("")]
        [InlineData(null)]
        public void MoneyOf_CurrencyNotProvided_ThrowsMoneyMustHaveCurrencyRule(string currency)
        {
            Action act = () => Money.Of(11, currency);

            var exception = Assert.Throws<BusinessRuleValidationException>(act);
            Assert.IsType<MoneyMustHaveCurrencyRule>(exception.Rule);
        }

        [Theory]
        [InlineData("PL")]
        [InlineData("EUR")]
        [InlineData("USD")]
        public void MoneyOf_CurrencyProvided_SuccessWithCurrency(string currency)
        {
            var money = Money.Of(11, currency);

            Assert.Equal(money.Currency, currency);
        }

        [Fact]
        public void TwoMoneyWithTheSameCurrencies_Sum_ReturnsCorrectValueAndCurrency()
        {
            var moneyPl1 = Money.Of(11, "PL");
            var moneyPl2 = Money.Of(22, "PL");

            var result = moneyPl1 + moneyPl2;
            
            Assert.Equal(result.Value, 33);
            Assert.Equal(result.Currency, "PL");
        }

        [Fact]
        public void TwoMoneyWithDifferentCurrencies_Sum_ThrowsMoneyOperationsMustHaveSameCurrenciesRule()
        {
            var moneyPl = Money.Of(11, "PL");
            var moneyEur = Money.Of(11, "EUR");

            Func<Money> act = () => moneyPl + moneyEur;

            var exception = Assert.Throws<BusinessRuleValidationException>(act);
            Assert.IsType<MoneyOperationsMustHaveSameCurrenciesRule>(exception.Rule);
        }
    }
}