using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Core.Queries;

namespace Accessibility.Application.Availabilities.Queries.GetAvailabilites
{
    public class GetAvailabilitiesQueryHandler : IQueryHandler<GetAvailabilitiesQuery, IEnumerable<AvailabilityDto>>
    {
        private readonly IAvailabilityQueryRepository repository;

        public GetAvailabilitiesQueryHandler(IAvailabilityQueryRepository repository)
        {
            this.repository = repository;
        }

        public async Task<IEnumerable<AvailabilityDto>> Handle(GetAvailabilitiesQuery request, CancellationToken cancellationToken)
        {
            if (request.EmployeeId is null)
            {
                return await repository.GetAvailabilities(
                    request.FacilityId,
                    request.ScheduleId,
                    request.StartTime??DateTime.MinValue,
                    request.EndTime??DateTime.MaxValue);
            }
            
            return await repository.GetAvailabilities(
                request.FacilityId,
                request.ScheduleId,
                request.StartTime??DateTime.MinValue,
                request.EndTime??DateTime.MaxValue,
                request.EmployeeId);
        }
    }
}
