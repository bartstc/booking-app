using System;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules.Availabilities
{
    public class AvailabilityData
    {
        public AvailabilityData(EmployeeId employeeId, DateTime startTime, DateTime endTime, EmployeeId creatorId)
        {
            EmployeeId = employeeId;
            StartTime = startTime;
            EndTime = endTime;
            CreatorId = creatorId;
        }

        public EmployeeId EmployeeId { get; }
        public DateTime StartTime { get; }
        public DateTime EndTime { get; }
        public EmployeeId CreatorId { get; }
    }
}
