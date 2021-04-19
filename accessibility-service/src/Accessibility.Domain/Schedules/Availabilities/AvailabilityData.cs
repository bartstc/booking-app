using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules.Availabilities
{
    public class AvailabilityData
    {
        public AvailabilityData(EmployeeId employeeId, PeriodOfTime periodOfTime, EmployeeId creatorId)
        {
            EmployeeId = employeeId;
            PeriodOfTime = periodOfTime;
            CreatorId = creatorId;
        }

        public EmployeeId EmployeeId { get; }
        public PeriodOfTime PeriodOfTime { get; }
        public EmployeeId CreatorId { get; }
    }
}
