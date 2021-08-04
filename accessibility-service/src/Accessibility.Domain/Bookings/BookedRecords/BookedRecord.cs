using System;
using System.Threading.Tasks;
using Accessibility.Domain.Bookings.BookedRecords.Rules;
using Accessibility.Domain.BookingServices.Rules;
using Core.Domain;
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
            this.EmployeeId = employeeId;
            this.OfferId = offerId;
            this.Price = price;
            this.Date = date;
            this.DurationInMinutes = durationInMinutes;
            this.Status = BookedRecordStatus.Booked;
        }

        public BookedRecordId Id { get; }
        public EmployeeId EmployeeId { get; }
        public OfferId OfferId { get; }
        public Money Price { get ;}
        public DateTime Date { get; }
        public short DurationInMinutes { get; }
        public BookedRecordStatus Status { get; private set; }
        public string Caution { get; private set; }
        // TODO: change to modifyDate
        private DateTime? changeDate;

        internal bool IsCompleted =>
            Status == BookedRecordStatus.CanceledByClient ||
            Status == BookedRecordStatus.CanceledByFacility ||
            Status == BookedRecordStatus.Fulfilled ||
            Status == BookedRecordStatus.NotRealized ||
            Date.AddMinutes(DurationInMinutes) <= DateTime.Now;

        internal void ChangeStatus(BookedRecordStatus newStatus, string caution = null)
        {
            CheckRule(new BookedRecordToBeChangedMustBeUnfinishedRule(this));

            Status = newStatus;
            Caution = caution;
            changeDate = DateTime.Now;
        }

        internal async Task<bool> IsTermAvailable(BookingId bookingId, FacilityId facilityId, IBookingPeriodOfTimeChecker checker) =>
            await checker.IsRecordAvailable(bookingId, facilityId, EmployeeId, Date, Date.AddMinutes(DurationInMinutes));
    }
}
