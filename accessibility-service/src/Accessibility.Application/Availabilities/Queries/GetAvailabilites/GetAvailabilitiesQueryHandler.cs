using System.Threading;
using System.Threading.Tasks;
using Core.Queries;

namespace Accessibility.Application.Availabilities.Queries.GetAvailabilites
{
    public class GetAvailabilitiesQueryHandler : IQueryHandler<GetAvailabilitiesQuery, QueryCollectionResult<AvailabilityDto>>
    {
        private readonly IAvailabilityQueryRepository repository;

        public GetAvailabilitiesQueryHandler(IAvailabilityQueryRepository repository)
        {
            this.repository = repository;
        }

        public Task<QueryCollectionResult<AvailabilityDto>> Handle(GetAvailabilitiesQuery request, CancellationToken cancellationToken)
        {
            return repository.GetAvailabilities(
                request.FacilityId,
                request.ScheduleId,
                request.Params
            );
        }
    }
}
