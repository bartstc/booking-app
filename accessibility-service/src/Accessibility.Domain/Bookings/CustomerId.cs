using System;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings
{
    public class CustomerId : StronglyTypedIdBase
    {
        public CustomerId(Guid value) : base(value)
        {
        }
    }
}