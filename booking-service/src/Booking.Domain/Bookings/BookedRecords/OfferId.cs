using System;
using Booking.Domain.SeedWork;

namespace Booking.Domain.Bookings.BookedRecords
{
    public class OfferId : StronglyTypedIdBase
    {
        public OfferId(Guid value) : base(value)
        {
        }
    }
}