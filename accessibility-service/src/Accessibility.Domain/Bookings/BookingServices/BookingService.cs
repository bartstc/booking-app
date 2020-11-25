using System;
using Accessibility.Domain.Bookings.BookingServices.Rules;
using Accessibility.Domain.BookingServices.Rules;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Bookings.BookingServices
{
    public class BookingService : Entity
    {
        private BookingService()
        {
        }

        internal BookingService(EmployeeId employeeId, OfferId offerId, Money price, DateTime date, short durationInMinutes)
        {
            CheckRule(new DateMustBeFromTheFutureRule(date));

            this.Id = new BookingServiceId(Guid.NewGuid());
            this.employeeId = employeeId;
            this.offerId = offerId;
            this.price = price;
            this.date = date;
            this.durationInMinutes = durationInMinutes;
            this.status = BookingServiceStatus.Booked;
        }

        internal BookingServiceId Id;
        private EmployeeId employeeId;
        private OfferId offerId;
        private Money price;
        private DateTime date;
        private short durationInMinutes;
        private BookingServiceStatus status;
        private DateTime? changeDate;

        internal bool IsFinished =>
            status == BookingServiceStatus.Canceled || status == BookingServiceStatus.Fulfilled;

        internal void ChangeStatus(BookingServiceStatus newStatus)
        {
            CheckRule(new BookingServiceToBeChangedMustBeUnfinishedRule(this));

            status = newStatus;
            changeDate = DateTime.Now;
        }
    }
}
