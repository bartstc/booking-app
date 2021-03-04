using System;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings
{
    public class BookingId : StronglyTypedIdBase
    {
        public BookingId(Guid value) : base(value)
        {
        }
    }
}