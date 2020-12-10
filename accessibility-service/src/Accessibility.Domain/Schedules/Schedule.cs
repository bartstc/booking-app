using System;
using System.Collections.Generic;
using System.Linq;
using Accessibility.Domain.Schedules.Availabilities;
using Accessibility.Domain.Schedules.Events;
using Accessibility.Domain.Schedules.Rules;
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

        public Schedule()
        {
        }

        public Schedule(
            ISchedulePeriodOfTimeChecker schedulePeriodOfTimeChecker,
            FacilityId facilityId, string name, DateTime startDate, DateTime endDate, List<AvailabilityData> availabilities, EmployeeId creatorId)
        {
            // TODO: check if any availabilities are included
            CheckRule(new NewSchedulePeriodOfTimeMustBeAvailableRule(schedulePeriodOfTimeChecker, facilityId, startDate, endDate));
            CheckRule(new WorkerAvailabilityCanNotDuplicateInPeriodOfTimeRule(availabilities));

            Id = new ScheduleId(Guid.NewGuid());
            this.facilityId = facilityId;
            this.name = name;
            this.startDate = startDate;
            this.endDate = endDate;
            this.creatorId = creatorId;
            creationDate = DateTime.Now;
            this.availabilities = availabilities.Select(a => Availability.Create(
                a.EmployeeId,
                a.StartTime,
                a.EndTime,
                a.EmployeeId
            )).ToList();

            AddDomainEvent(new ScheduleCreatedEvent(Id));
        }

        public void CreateCorrection(List<AvailabilityData> corrections)
        {
            // TODO: check if corrections are not in the same period of time (exclude old availabilities)
            var currentPriority = availabilities.Max(a => a.Priority);
            var nextPriority = (short)(currentPriority + 1);

            availabilities.AddRange(corrections.Select(correction => Availability.CreateCorrection(
                correction.EmployeeId,
                correction.StartTime,
                correction.EndTime,
                correction.EmployeeId,
                nextPriority
            )));

            modifyDate = DateTime.Now;

            AddDomainEvent(new ScheduleCorrectedEvent(Id));
        }
    }
}
