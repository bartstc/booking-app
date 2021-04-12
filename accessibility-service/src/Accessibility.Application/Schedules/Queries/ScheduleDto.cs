using System;
using System.Collections.Generic;

namespace Accessibility.Application.Schedules.Queries
{
    public class ScheduleDto
    {
        public ScheduleDto()
        {
            Availabilities = new List<AvailabilityDto>();
        }

        public Guid ScheduleId { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreationDate { get; set; }
        public List<AvailabilityDto> Availabilities { get; set; }
    }
}
