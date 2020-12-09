using System;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules.Availabilities
{
    public class Availability : Entity
    {
        internal AvailabilityId Id;
        private EmployeeId employeeId;
        private DateTime startTime;
        private DateTime endTime;
        internal short Priority { get; }
        private EmployeeId creatorId;
        private DateTime creationDate;
        // TODO: employeeComment

        private Availability(EmployeeId employeeId, DateTime startTime, DateTime endTime, EmployeeId creatorId, short priority)
        {
            this.employeeId = employeeId;
            this.startTime = startTime;
            this.endTime = endTime;
            this.creatorId = creatorId;
            this.Priority = priority;
            creationDate = DateTime.Now;
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
