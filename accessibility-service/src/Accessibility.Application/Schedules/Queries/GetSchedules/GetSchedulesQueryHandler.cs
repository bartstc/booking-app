using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Accessibility.Application.Schedules.Queries.GetSchedules
{
    public class GetSchedulesQueryHandler : IRequestHandler<GetSchedulesQuery, IEnumerable<ScheduleDto>>
    {
        private readonly IScheduleQueryRepository repository;

        public GetSchedulesQueryHandler(IScheduleQueryRepository repository)
        {
            this.repository = repository;
        }

        public async Task<IEnumerable<ScheduleDto>> Handle(GetSchedulesQuery request, CancellationToken cancellationToken)
        {
            return await repository.GetSchedules(request.DateFrom??DateTime.MinValue, request.DateTo??DateTime.MaxValue, request.FacilityId);
        }
    }
}
