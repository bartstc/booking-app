using Booking.Domain.SeedWork;

namespace Booking.Domain.SharedKernel
{
    public class MoneyMustHaveCurrencyRule : IBusinessRule
    {
        private readonly string currency;

        public MoneyMustHaveCurrencyRule(string currency)
        {
            this.currency = currency;
        }

        public string Message => "Money must have currency";

        public bool IsBroken() =>
            string.IsNullOrEmpty(currency);
    }
}