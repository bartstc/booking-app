using System;
using System.Collections.Generic;
using System.Linq;
using Accessibility.Domain.Schedules.Availabilities;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules
{
    public class Schedule : Entity, IAggregateRoot
    {
        public ScheduleId Id { get; }
        private FacilityId facilityId;
        private string name;
        private DateTime startDate;
        private DateTime endDate;
        private List<Availability> availabilities;
        private EmployeeId creatorId;
        private DateTime creationDate;
        private DateTime? modifyDate;

        public Schedule(
            FacilityId facilityId, string name, DateTime startDate, DateTime endDate, List<AvailabilityData> availabilities, EmployeeId creatorId)
        {
            this.facilityId = facilityId;
            this.name = name;
            this.startDate = startDate;
            this.endDate = endDate;
            this.creatorId = creatorId;
            this.availabilities = availabilities.Select(a => Availability.Create(
                a.EmployeeId,
                a.StartTime,
                a.EndTime,
                a.EmployeeId
            )).ToList();
        }
    }
}
