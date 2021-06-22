using Core.Domain;

namespace Accessibility.Domain.SharedKernel
{
    public class MoneyOperationsMustHaveSameCurrenciesRule : IBusinessRule
    {
        private readonly Money money1;
        private readonly Money money2;

        public MoneyOperationsMustHaveSameCurrenciesRule(Money money1, Money money2)
        {
            this.money1 = money1;
            this.money2 = money2;
        }

        public string Message => "Money currencies must be the same";

        public bool IsBroken() =>
            money1.Currency != money2.Currency;
    }
}