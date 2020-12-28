using System;
using Booking.Domain.SeedWork;

namespace Booking.Domain.Bookings
{
    public class BookingId : StronglyTypedIdBase
    {
        public BookingId(Guid value) : base(value)
        {
        }
    }
}