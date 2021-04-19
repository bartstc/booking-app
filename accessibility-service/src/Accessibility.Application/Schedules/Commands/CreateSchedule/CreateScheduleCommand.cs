using System;
using MediatR;

namespace Accessibility.Application.Schedules.Commands.CreateSchedule
{
    public class CreateScheduleCommand : IRequest<Guid>
    {
        public CreateScheduleCommand(Guid facilityId, string name, DateTime startDate, DateTime endDate, Guid creatorId)
        {
            FacilityId = facilityId;
            Name = name;
            StartDate = startDate;
            EndDate = endDate;
            CreatorId = creatorId;
        }

        public Guid FacilityId { get; }
        public string Name { get; }
        public DateTime StartDate { get; }
        public DateTime EndDate { get; }
        public Guid CreatorId { get; }
    }
}
