using System;
using System.Text.Json.Serialization;

namespace Accessibility.Application.Schedules.Queries
{
    public class AvailabilityDto
    {
        [JsonIgnore]
        public Guid ScheduleId { get; set; }
        public Guid EmployeeId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public short Priority { get; set; }
        public Guid CreatorId { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
