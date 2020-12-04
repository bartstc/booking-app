using System;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules.Availabilities
{
    internal class Availability : Entity
    {
        private AvailabilityId id;
        private EmployeeId employeeId;
        private TimeSpan startTime;
        private TimeSpan endTime;
        public short Priority { get; }
        private EmployeeId creatorId;
        private DateTime creationDate;
        // TODO: employeeComment

        private Availability(EmployeeId employeeId, TimeSpan startTime, TimeSpan endTime, EmployeeId creatorId, short priority)
        {
            this.employeeId = employeeId;
            this.startTime = startTime;
            this.endTime = endTime;
            this.creatorId = creatorId;
            this.Priority = priority;
        }

        internal static Availability Create(EmployeeId employeeId, TimeSpan startTime, TimeSpan endTime, EmployeeId creatorId)
        {
            return new Availability(employeeId, startTime, endTime, creatorId, 0);
        }

        internal static Availability CreateCorrection(EmployeeId employeeId, TimeSpan startTime, TimeSpan endTime, EmployeeId creatorId, short priority)
        {
            return new Availability(employeeId, startTime, endTime, creatorId, priority);
        }
    }
}
