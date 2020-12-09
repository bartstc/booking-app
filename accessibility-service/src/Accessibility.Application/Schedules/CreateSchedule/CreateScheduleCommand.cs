using System;
using System.Collections.Generic;
using Accessibility.Domain.Schedules.Availabilities;
using Accessibility.Domain.SharedKernel;
using MediatR;

namespace Accessibility.Application.Schedules.CreateSchedule
{
    public class CreateScheduleCommand : IRequest<Guid>
    {
        public CreateScheduleCommand(Guid facilityId, string name, DateTime startDate, DateTime endDate, List<AvailabilityData> availabilities, EmployeeId creatorId)
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
        public List<AvailabilityData> Availabilities { get; }
        public EmployeeId CreatorId { get; }
    }
}
