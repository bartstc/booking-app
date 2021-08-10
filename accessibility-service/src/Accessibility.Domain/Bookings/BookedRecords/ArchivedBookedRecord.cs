using System;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Bookings.BookedRecords
{
    public class ArchivedBookedRecord
    {
        public ArchivedBookedRecord(BookedRecordId id, EmployeeId employeeId, OfferId offerId, DateTime date, short durationInMinutes, BookedRecordStatus status, string caution)
        {
            Id = id;
            EmployeeId = employeeId;
            OfferId = offerId;
            Date = date;
            DurationInMinutes = durationInMinutes;
            Status = status;
            Caution = caution;
        }

        public BookedRecordId Id { get; set; }
        public EmployeeId EmployeeId { get; }
        public OfferId OfferId { get; }
        public DateTime Date { get; }
        public short DurationInMinutes { get; }
        public BookedRecordStatus Status { get; }
        public string Caution { get; }
    }
}
