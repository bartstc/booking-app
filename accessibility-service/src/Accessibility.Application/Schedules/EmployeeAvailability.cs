using System;

namespace Accessibility.Application.Schedules
{
    public class EmployeeAvailability
    {
        public Guid EmployeeId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
