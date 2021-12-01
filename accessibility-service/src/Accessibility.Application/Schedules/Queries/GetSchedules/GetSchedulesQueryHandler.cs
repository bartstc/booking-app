using System.Threading;
using System.Threading.Tasks;
using Core.Queries;

namespace Accessibility.Application.Schedules.Queries.GetSchedules
{
    public class GetSchedulesQueryHandler : IQueryHandler<GetSchedulesQuery, QueryCollectionResult<ScheduleDto>>
    {
        private readonly IScheduleQueryRepository repository;

        public GetSchedulesQueryHandler(IScheduleQueryRepository repository)
        {
            this.repository = repository;
        }

        public async Task<QueryCollectionResult<ScheduleDto>> Handle(GetSchedulesQuery request, CancellationToken cancellationToken)
        {
            return await repository.GetSchedules(
                request.FacilityId,
                request.Params);
        }
    }
}
