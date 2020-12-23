using System;
using System.Collections.Generic;
using MediatR;

namespace Accessibility.Application.Schedules.CreateSchedule
{
    public class CreateScheduleCommand : IRequest<Guid>
    {
        public CreateScheduleCommand(Guid facilityId, string name, DateTime startDate, DateTime endDate, List<AvailabilityDto> availabilities, Guid creatorId)
        {
            FacilityId = facilityId;
            Name = name;
            StartDate = startDate;
            EndDate = endDate;
            Availabilities = availabilities;
            CreatorId = creatorId;
        }

        public Guid FacilityId { get; }
        public string Name { get; }
        public DateTime StartDate { get; }
        public DateTime EndDate { get; }
        public List<AvailabilityDto> Availabilities { get; }
        public Guid CreatorId { get; }
    }
}
