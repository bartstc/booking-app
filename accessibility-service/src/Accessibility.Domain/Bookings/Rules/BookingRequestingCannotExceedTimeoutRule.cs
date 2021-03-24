using System;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings.Rules
{
    public class BookingRequestingCannotExceedTimeoutRule : IBusinessRule
    {
        private readonly DateTime requestedDate;
        private int timeout = 5;

        public BookingRequestingCannotExceedTimeoutRule(DateTime requestedDate)
        {
            this.requestedDate = requestedDate;
        }
        
        public string Message => "The booking request took too long.";

        public bool IsBroken() =>
            requestedDate.AddSeconds(timeout) <= DateTime.Now;
    }
}
