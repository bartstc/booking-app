using System;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules.Availabilities
{
    public class AvailabilityData
    {
        public AvailabilityData(EmployeeId employeeId, TimeSpan startTime, TimeSpan endTime, EmployeeId creatorId)
        {
            EmployeeId = employeeId;
            StartTime = startTime;
            EndTime = endTime;
            CreatorId = creatorId;
        }

        public EmployeeId EmployeeId { get; }
        public TimeSpan StartTime { get; }
        public TimeSpan EndTime { get; }
        public EmployeeId CreatorId { get; set; }
    }
}
