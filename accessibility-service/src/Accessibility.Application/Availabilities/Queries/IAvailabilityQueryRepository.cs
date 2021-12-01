using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Accessibility.Application.Availabilities.Queries.GetAvailabilites;
using Accessibility.Application.Schedules;
using Core.Queries;

namespace Accessibility.Application.Availabilities.Queries
{
    public interface IAvailabilityQueryRepository
    {
        Task<IEnumerable<EmployeeAvailability>> GetAllAvailabilities(DateTime dateFrom, DateTime dateTo, Guid facilityId);
        Task<QueryCollectionResult<AvailabilityDto>> GetAvailabilities(Guid facilityId, Guid scheduleId, GetAvailabilitiesQueryParams @params);
    }
}
