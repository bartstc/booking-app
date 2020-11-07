using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings.Rules
{
    public class NewStatusMustHaveCorrectPreviousStatusRule : IBusinessRule
    {
        private readonly BookingStatus previousStatus;
        private readonly BookingStatus newStatus;

        public NewStatusMustHaveCorrectPreviousStatusRule(BookingStatus previousStatus, BookingStatus newStatus)
        {
            this.newStatus = newStatus;
            this.previousStatus = previousStatus;
        }

        public string Message => $"Can not change booking status from {previousStatus} to {newStatus}";

        public bool IsBroken() =>
            previousStatus == BookingStatus.Fulfilled || previousStatus == BookingStatus.Canceled || newStatus == BookingStatus.Booked;
    }
}