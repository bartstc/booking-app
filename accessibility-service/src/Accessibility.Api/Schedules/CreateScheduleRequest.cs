using System;
using System.Collections.Generic;
using Accessibility.Application.Schedules.CreateSchedule;
using Accessibility.Domain.Schedules.Availabilities;

namespace Accessibility.Api.Schedules
{
    public class CreateScheduleRequest
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<AvailabilityDto> Availabilities { get; set; }
        public Guid CreatorId { get; set; }
    }
}
