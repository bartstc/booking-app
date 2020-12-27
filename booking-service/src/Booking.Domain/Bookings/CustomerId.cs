using System;
using Booking.Domain.SeedWork;

namespace Booking.Domain.Bookings
{
    public class CustomerId : StronglyTypedIdBase
    {
        public CustomerId(Guid value) : base(value)
        {
        }
    }
}