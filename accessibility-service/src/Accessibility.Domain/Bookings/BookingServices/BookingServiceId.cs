using System;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings.BookingServices
{
    public class BookingServiceId : StronglyTypedIdBase
    {
        public BookingServiceId(Guid value) : base(value)
        {
        }
    }
}
