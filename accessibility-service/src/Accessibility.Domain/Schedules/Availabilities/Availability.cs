using System;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules.Availabilities
{
    public class Availability : Entity
    {
        internal AvailabilityId Id { get; }
        private EmployeeId employeeId;
        internal DateTime StartTime { get; private set; }
        internal DateTime EndTime { get; private set; }
        internal short Priority { get; private set; }
        private EmployeeId creatorId;
        private DateTime creationDate;
        // TODO: employeeComment

        public Availability()
        {
        }

        private Availability(EmployeeId employeeId, DateTime startTime, DateTime endTime, EmployeeId creatorId, short priority)
        {
            Id = new AvailabilityId(Guid.NewGuid());
            this.employeeId = employeeId;
            this.StartTime = startTime;
            this.EndTime = endTime;
            this.creatorId = creatorId;
            this.Priority = priority;
            creationDate = DateTime.Now;
        }

        internal void Correct(DateTime startTime, DateTime endTime, short priority)
        {
            StartTime = startTime < StartTime ? startTime : StartTime;
            EndTime = endTime > EndTime ? endTime : EndTime;
            this.Priority = priority;
        }

        internal static Availability Create(EmployeeId employeeId, DateTime startTime, DateTime endTime, EmployeeId creatorId)
        {
            return new Availability(employeeId, startTime, endTime, creatorId, 0);
        }

        internal static Availability CreateCorrection(EmployeeId employeeId, DateTime startTime, DateTime endTime, EmployeeId creatorId, short priority)
        {
            return new Availability(employeeId, startTime, endTime, creatorId, priority);
        }
    }
}
