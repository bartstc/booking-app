using System;
using Booking.Domain.SeedWork;

namespace Booking.Domain.SharedKernel
{
    public class OfferId : StronglyTypedIdBase
    {
        public OfferId(Guid value) : base(value)
        {
        }
    }
}