using System;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings.Rules
{
    public class BookingOnStatusChangeMustHaveCorrectPreviousStatus : IBusinessRule
    {
        private readonly BookingStatus previousStatus;
        private readonly BookingStatus newStatus;

        public BookingOnStatusChangeMustHaveCorrectPreviousStatus(BookingStatus previousStatus, BookingStatus newStatus)
        {
            this.previousStatus = previousStatus;
            this.newStatus = newStatus;
        }
        
        public string Message => $"Can not change booking status from {previousStatus} to {newStatus}.";

        public bool IsBroken()
        {
            if (previousStatus == BookingStatus.Requested)
            {
                return newStatus != BookingStatus.Booked;
            }
            if (previousStatus == BookingStatus.Booked)
            {
                return newStatus != BookingStatus.Finished;
            }
            return true;
        }
    }
}
