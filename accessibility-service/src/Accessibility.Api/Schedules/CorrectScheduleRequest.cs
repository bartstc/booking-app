using System.Collections.Generic;
using Accessibility.Application.Schedules.CreateSchedule;

namespace Accessibility.Api.Schedules
{
    public class CorrectScheduleRequest
    {
        public List<AvailabilityDto> Availabilities { get; set; }
    }
}
