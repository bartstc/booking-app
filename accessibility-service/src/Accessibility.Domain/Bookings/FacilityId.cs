using System;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings
{
    public class FacilityId : StronglyTypedIdBase
    {
        public FacilityId(Guid value) : base(value)
        {
        }
    }
}
