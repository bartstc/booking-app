using System;
using Core.Domain;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules.Availabilities
{
    public class Availability : Entity
    {
        internal AvailabilityId Id { get; }
        public EmployeeId EmployeeId { get; }
        public PeriodOfTime PeriodOfTime { get; private set; }
        internal short Priority { get; private set; }
        private EmployeeId creatorId;
        private DateTime creationDate;
        // TODO: employeeComment

        public Availability()
        {
        }

        private Availability(EmployeeId employeeId, PeriodOfTime periodOfTime, EmployeeId creatorId, short priority)
        {
            Id = new AvailabilityId(Guid.NewGuid());
            this.EmployeeId = employeeId;
            this.PeriodOfTime = periodOfTime;
            this.creatorId = creatorId;
            this.Priority = priority;
            creationDate = DateTime.Now;
        }

        internal void Correct(PeriodOfTime periodOfTime, short priority)
        {
            PeriodOfTime.DateFrom = periodOfTime.DateFrom < PeriodOfTime.DateFrom ? periodOfTime.DateFrom : PeriodOfTime.DateFrom;
            PeriodOfTime.DateTo = periodOfTime.DateTo > PeriodOfTime.DateTo ? periodOfTime.DateTo : PeriodOfTime.DateTo;
            this.Priority = priority;
        }

        internal static Availability Create(EmployeeId employeeId, PeriodOfTime periodOfTime, EmployeeId creatorId)
        {
            return new Availability(employeeId, periodOfTime, creatorId, 0);
        }

        internal static Availability CreateCorrection(EmployeeId employeeId, PeriodOfTime periodOfTime, EmployeeId creatorId, short priority)
        {
            return new Availability(employeeId, periodOfTime, creatorId, priority);
        }
    }
}
