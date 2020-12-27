using System;
using Booking.Domain.SeedWork;

namespace Booking.Domain.BookingServices.Rules
{
    public class DateMustBeFromTheFutureRule : IBusinessRule
    {
        private readonly DateTime date;

        public DateMustBeFromTheFutureRule(DateTime date)
        {
            this.date = date;
        }

        public string Message => "Booking must have future date";

        public bool IsBroken() =>
            date <= DateTime.Now;
    }
}