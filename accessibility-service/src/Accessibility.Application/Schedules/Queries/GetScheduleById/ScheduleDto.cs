using System;
using System.Collections.Generic;

namespace Accessibility.Application.Schedules.Queries.GetScheduleById
{
    public class ScheduleDto
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreationDate { get; set; }
        public List<AvailabilityDto> Availibilities { get; set; }
    }
}
