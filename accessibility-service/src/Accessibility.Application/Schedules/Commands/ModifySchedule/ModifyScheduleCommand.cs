using System;
using System.Collections.Generic;
using MediatR;

namespace Accessibility.Application.Schedules.Commands.ModifySchedule
{
    public class ModifyScheduleCommand : IRequest<Guid>
    {
        public ModifyScheduleCommand(Guid facilityId, Guid scheduleId, string name, DateTime startDate, DateTime endDate, List<AvailabilityDto> availabilities, Guid creatorId)
        {
            FacilityId = facilityId;
            ScheduleId = scheduleId;
            Name = name;
            StartDate = startDate;
            EndDate = endDate;
            Availabilities = availabilities;
            CreatorId = creatorId;
        }

        public Guid FacilityId { get; }
        public Guid ScheduleId { get; }
        public string Name { get; }
        public DateTime StartDate { get; }
        public DateTime EndDate { get; }
        public List<AvailabilityDto> Availabilities { get; }
        public Guid CreatorId { get; }
    }
}
