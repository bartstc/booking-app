using System;

namespace Accessibility.Application.Schedules.Commands
{
    public class AvailabilityDto
    {
        public AvailabilityDto(Guid employeeId, DateTime startTime, DateTime endTime, Guid creatorId)
        {
            EmployeeId = employeeId;
            StartTime = startTime;
            EndTime = endTime;
            CreatorId = creatorId;
        }

        public Guid EmployeeId { get; }
        public DateTime StartTime { get; }
        public DateTime EndTime { get; }
        public Guid CreatorId { get; }
    }
}
