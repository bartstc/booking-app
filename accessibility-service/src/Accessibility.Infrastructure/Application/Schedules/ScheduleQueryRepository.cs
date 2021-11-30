using System;
using System.Threading.Tasks;
using Accessibility.Application.Schedules;
using Accessibility.Application.Schedules.Queries;
using Accessibility.Application.Schedules.Queries.GetSchedules;
using Core.Database;
using Core.Persistence.Postgres;
using Core.Queries;
using SqlKata;

namespace Accessibility.Infrastructure.Application.Schedules
{
    public class ScheduleQueryRepository : QueryRepositoryBase, IScheduleQueryRepository
    {
        public ScheduleQueryRepository(
            ISqlConnectionFactory sqlConnectionFactory) : base(sqlConnectionFactory)
        {
        }

        public Task<QueryCollectionResult<ScheduleDto>> GetSchedules(
            Guid facilityId,
            GetSchedulesQueryParams @params
        ) =>
            GetCollectionResultAsync<ScheduleDto>(
                new Query("accessibility.schedules")
                    .Select(
                        "schedule_id as ScheduleId",
                        "name",
                        "start_date as StartDate",
                        "end_date as EndDate",
                        "creation_date as CreationDate")
                    .Where("facility_id", facilityId)
                    .Where("start_date", ">=", @params.DateFrom??DateTime.MinValue)
                    .Where("end_date", "<=", @params.DateTo??DateTime.MaxValue),
                @params
            );
    }
}
