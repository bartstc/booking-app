using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Accessibility.Application.Availabilities.Queries;
using Accessibility.Application.Availabilities.Queries.GetAvailabilites;
using Accessibility.Application.Schedules;
using Core.Database;
using Core.Persistence.Postgres;
using Core.Queries;
using Dapper;
using SqlKata;

namespace Accessibility.Infrastructure.Application.Availabilities
{
    public class AvailabilityQueryRepository : QueryRepositoryBase, IAvailabilityQueryRepository
    {
        public AvailabilityQueryRepository(ISqlConnectionFactory sqlConnectionFactory) : base(sqlConnectionFactory)
        {
        }
        
        public async Task<IEnumerable<EmployeeAvailability>> GetAllAvailabilities(DateTime dateFrom, DateTime dateTo, Guid facilityId)
        {
            return await Connection.QueryAsync<EmployeeAvailability>(
                @"SELECT
                    a.employee_id as EmployeeId,
                    a.start_time AS StartTime,
                    a.end_time as EndTime
                FROM
                    accessibility.availabilities a INNER JOIN
                    accessibility.schedules s ON a.schedule_id = s.schedule_id
                WHERE
                    a.start_time >= @dateFrom AND
                    a.end_time <= @dateTo AND
                    s.facility_id = @facilityId;",
                new
                {
                    dateFrom,
                    dateTo,
                    facilityId
                }
            );
        }

        public Task<QueryCollectionResult<AvailabilityDto>> GetAvailabilities(
            Guid facilityId,
            Guid scheduleId,
            GetAvailabilitiesQueryParams @params)
        {
            var query = new Query(
                "accessibility.availabilities as a")
                    .Select(
                        "a.employee_id AS EmployeeId",
                        "a.start_time AS StartTime",
                        "a.end_time AS EndTime",
                        "a.priority",
                        "a.creator_id AS CreatorId",
                        "a.creation_date AS CreationDate")
                    .Join("accessibility.schedules as s", "a.schedule_id", "s.schedule_id")
                    .Where("a.schedule_id", scheduleId)
                    .Where("s.facility_id", facilityId)
                    .Where("a.start_time", ">=", @params.StartTime)
                    .Where("a.end_time", "<=", @params.EndTime);

            if (@params.EmpleyeeId != default)
            {
                query = query
                    .Where("a.employee_id", @params.EmpleyeeId);
            }

            return GetCollectionResultAsync<AvailabilityDto>(
                query,
                @params
            );
        }
    }
}
