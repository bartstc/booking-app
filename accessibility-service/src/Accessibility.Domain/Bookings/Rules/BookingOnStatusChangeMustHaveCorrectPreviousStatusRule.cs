using Core.Domain;

namespace Accessibility.Domain.Bookings.Rules
{
    public class BookingOnStatusChangeMustHaveCorrectPreviousStatusRule : IBusinessRule
    {
        private readonly BookingStatus previousStatus;
        private readonly BookingStatus newStatus;

        public BookingOnStatusChangeMustHaveCorrectPreviousStatusRule(BookingStatus previousStatus, BookingStatus newStatus)
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
                return newStatus != BookingStatus.Completed;
            }
            return true;
        }
    }
}
