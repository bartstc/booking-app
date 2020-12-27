using Booking.Domain.SeedWork;

namespace Booking.Domain.Bookings.BookedRecords.Rules
{
    public class BookedRecordToBeChangedMustBeUnfinishedRule : IBusinessRule
    {
        private readonly BookedRecord bookedRecord;

        public BookedRecordToBeChangedMustBeUnfinishedRule(BookedRecord bookingService)
        {
            this.bookedRecord = bookingService;
        }

        public string Message => "Booking to be changed must be unfinished";

        public bool IsBroken() => bookedRecord.IsFinished;
    }
}
