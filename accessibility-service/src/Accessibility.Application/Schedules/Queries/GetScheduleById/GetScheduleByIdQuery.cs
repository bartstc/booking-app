using System;
using Core.Queries;

namespace Accessibility.Application.Schedules.Queries.GetScheduleById
{
    public class GetScheduleByIdQuery : IQuery<ScheduleDto>
    {
        public GetScheduleByIdQuery(Guid scheduleId)
        {
            ScheduleId = scheduleId;
        }

        public Guid ScheduleId { get; }
    }
}
