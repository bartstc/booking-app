using System;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings.BookedRecords
{
    public class OfferId : StronglyTypedIdBase
    {
        public OfferId(Guid value) : base(value)
        {
        }
    }
}