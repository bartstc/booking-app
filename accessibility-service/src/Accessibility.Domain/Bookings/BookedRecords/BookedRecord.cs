using System;
using Accessibility.Domain.Bookings.BookedRecords.Rules;
using Accessibility.Domain.BookingServices.Rules;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Bookings.BookedRecords
{
    public class BookedRecord : Entity
    {
        private BookedRecord()
        {
        }

        internal BookedRecord(EmployeeId employeeId, OfferId offerId, Money price, DateTime date, short durationInMinutes)
        {
            CheckRule(new DateMustBeFromTheFutureRule(date));

            this.Id = new BookedRecordId(Guid.NewGuid());
            this.employeeId = employeeId;
            this.offerId = offerId;
            this.price = price;
            this.date = date;
            this.durationInMinutes = durationInMinutes;
            this.status = BookedRecordStatus.Booked;
        }

        internal BookedRecordId Id;
        private EmployeeId employeeId;
        private OfferId offerId;
        private Money price;
        private DateTime date;
        private short durationInMinutes;
        private BookedRecordStatus status;
        private DateTime? changeDate;

        internal bool IsFinished =>
            status == BookedRecordStatus.Canceled || status == BookedRecordStatus.Fulfilled;

        internal void ChangeStatus(BookedRecordStatus newStatus)
        {
            CheckRule(new BookedRecordToBeChangedMustBeUnfinishedRule(this));

            status = newStatus;
            changeDate = DateTime.Now;
        }
    }
}
