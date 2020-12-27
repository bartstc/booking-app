using System;
using Booking.Domain.SeedWork;

namespace Booking.Domain.Bookings.BookedRecords
{
    public class BookedRecordId : StronglyTypedIdBase
    {
        public BookedRecordId(Guid value) : base(value)
        {
        }
    }
}
