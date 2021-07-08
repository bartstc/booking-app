using System;
using System.Collections.Generic;
using Core.Commands;

namespace Accessibility.Application.Schedules.Commands.ApplyCorrection
{
    public class ApplyCorrectionCommand : ICommand
    {
        public ApplyCorrectionCommand(Guid facilityId, Guid scheduleId, List<AvailabilityDto> availabilities)
        {
            Availabilities = availabilities;
            FacilityId = facilityId;
            ScheduleId = scheduleId;
        }

        public Guid FacilityId { get; set; }
        public Guid ScheduleId { get; set; }
        public List<AvailabilityDto> Availabilities { get; }
    }
}
