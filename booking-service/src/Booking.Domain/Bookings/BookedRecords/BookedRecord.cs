using System;
using Booking.Domain.Bookings.BookedRecords.Rules;
using Booking.Domain.BookingServices.Rules;
using Booking.Domain.SeedWork;
using Booking.Domain.SharedKernel;

namespace Booking.Domain.Bookings.BookedRecords
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
        // TODO: change to modifyDate
        private DateTime? changeDate;

        internal bool IsFinished =>
            status == BookedRecordStatus.Canceled || status == BookedRecordStatus.Fulfilled || status == BookedRecordStatus.NotRealized;

        internal void ChangeStatus(BookedRecordStatus newStatus)
        {
            CheckRule(new BookedRecordToBeChangedMustBeUnfinishedRule(this));

            status = newStatus;
            changeDate = DateTime.Now;
        }
    }
}
