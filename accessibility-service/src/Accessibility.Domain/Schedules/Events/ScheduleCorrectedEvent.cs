using Accessibility.Domain.Schedules.Availabilities;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Schedules.Events
{
    public class ScheduleCorrectedEvent : DomainEventBase
    {
        public ScheduleCorrectedEvent(ScheduleId scheduleId, AvailabilityId correctionId)
        {
            ScheduleId = scheduleId;
            CorrectionId = correctionId;
        }

        public ScheduleId ScheduleId { get; }
        public AvailabilityId CorrectionId { get; }
    }
}
