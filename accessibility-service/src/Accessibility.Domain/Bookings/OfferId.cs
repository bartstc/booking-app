using System;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings
{
    public class OfferId : StronglyTypedIdBase
    {
        public OfferId(Guid value) : base(value)
        {
        }
    }
}