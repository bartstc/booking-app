using System;
using Core.Domain;

namespace Accessibility.Domain.Schedules.Availabilities
{
    public class AvailabilityId : StronglyTypedIdBase
    {
        public AvailabilityId(Guid value) : base(value)
        {
        }
    }
}
