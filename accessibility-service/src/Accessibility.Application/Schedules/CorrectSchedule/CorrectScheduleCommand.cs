using System;
using MediatR;

namespace Accessibility.Application.Schedules.CorrectSchedule
{
    public class CorrectScheduleCommand : IRequest
    {
        public CorrectScheduleCommand(Guid scheduleId, Guid employeeId, DateTime startTime, DateTime endTime, Guid creatorId)
        {
            ScheduleId = scheduleId;
            EmployeeId = employeeId;
            StartTime = startTime;
            EndTime = endTime;
            CreatorId = creatorId;
        }

        public Guid ScheduleId { get; set; }
        public Guid EmployeeId { get; }
        public DateTime StartTime { get; }
        public DateTime EndTime { get; }
        public Guid CreatorId { get; }
    }
}
