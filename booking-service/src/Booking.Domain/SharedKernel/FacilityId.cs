using System;
using Booking.Domain.SeedWork;

namespace Booking.Domain.SharedKernel
{
    public class FacilityId : StronglyTypedIdBase
    {
        public FacilityId(Guid value) : base(value)
        {
        }
    }
}
