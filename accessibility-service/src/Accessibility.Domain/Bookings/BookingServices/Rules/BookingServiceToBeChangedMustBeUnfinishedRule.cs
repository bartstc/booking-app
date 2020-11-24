using System;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings.BookingServices.Rules
{
    public class BookingServiceToBeChangedMustBeUnfinishedRule : IBusinessRule
    {
        private readonly BookingService bookingService;

        public BookingServiceToBeChangedMustBeUnfinishedRule(BookingService bookingService)
        {
            this.bookingService = bookingService;
        }

        public string Message => "Booking to be changed must be unfinished";

        public bool IsBroken() => bookingService.IsFinished;
    }
}
