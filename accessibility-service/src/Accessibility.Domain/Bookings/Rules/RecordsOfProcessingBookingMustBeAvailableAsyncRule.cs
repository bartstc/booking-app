using System.Collections.Generic;
using System.Threading.Tasks;
using Accessibility.Domain.Bookings.BookedRecords;
using Core.Domain;

namespace Accessibility.Domain.Bookings.Rules
{
    public class RecordsOfProcessingBookingMustBeAvailableAsyncRule : IBusinessRuleAsync
    {
        private readonly Booking booking;
        private readonly List<BookedRecord> records;
        private readonly IBookingPeriodOfTimeChecker checker;

        public RecordsOfProcessingBookingMustBeAvailableAsyncRule(Booking booking, List<BookedRecord> records, IBookingPeriodOfTimeChecker checker)
        {
            this.booking = booking;
            this.records = records;
            this.checker = checker;
        }

        public string Message => "Booking terms are no longer available.";

        public async Task<bool> IsBrokenAsync()
        {
            foreach (var record in records)
            {
                if (!(await record.IsTermAvailable(
                    booking.Id,
                    booking.FacilityId,
                    checker)))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
