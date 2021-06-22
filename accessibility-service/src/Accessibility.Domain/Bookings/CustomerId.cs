using System;
using Core.Domain;

namespace Accessibility.Domain.Bookings
{
    public class CustomerId : StronglyTypedIdBase
    {
        public CustomerId(Guid value) : base(value)
        {
        }
    }
}