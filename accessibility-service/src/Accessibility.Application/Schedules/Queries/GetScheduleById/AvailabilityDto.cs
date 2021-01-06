using System;

namespace Accessibility.Application.Schedules.Queries.GetScheduleById
{
    public class AvailabilityDto
    {
        public Guid EmployeeId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public short Priority { get; set; }
        public Guid CreatorId { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
