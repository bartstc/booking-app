using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Schedules.Events
{
    public class ScheduleCorrectedEvent : DomainEventBase
    {
        public ScheduleCorrectedEvent(ScheduleId scheduleId)
        {
            ScheduleId = scheduleId;
        }

        public ScheduleId ScheduleId { get; }
    }
}
