using System;
using Core.Domain;

namespace Accessibility.Domain.Schedules
{
    public class ScheduleId : StronglyTypedIdBase
    {
        public ScheduleId(Guid value) : base(value)
        {
        }
    }
}
