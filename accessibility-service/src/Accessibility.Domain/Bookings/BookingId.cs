using System;
using Core.Domain;

namespace Accessibility.Domain.Bookings
{
    public class BookingId : StronglyTypedIdBase
    {
        public BookingId(Guid value) : base(value)
        {
        }
    }
}