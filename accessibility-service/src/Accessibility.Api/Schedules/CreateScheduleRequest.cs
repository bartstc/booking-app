using System;

namespace Accessibility.Api.Schedules
{
    public class CreateScheduleRequest
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid CreatorId { get; set; }
    }
}
