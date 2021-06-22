using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Accessibility.Application.Schedules;
using Accessibility.Application.Schedules.Queries;
using Core.Database;
using Dapper;

namespace Accessibility.Infrastructure.Application.Schedules
{
    public class ScheduleQueryRepository : IScheduleQueryRepository
    {
        private readonly IDbConnection connection;

        public ScheduleQueryRepository(ISqlConnectionFactory sqlConnectionFactory)
        {
            connection = sqlConnectionFactory.GetConnection();
        }

        public async Task<IEnumerable<ScheduleDto>> GetSchedules(DateTime dateFrom, DateTime dateTo, Guid facilityId)
        {
            return await connection.QueryAsync<ScheduleDto>(
                @"SELECT
                    s.schedule_id AS ScheduleId,
                    s.name,
                    s.start_date AS StartDate,
                    s.end_date AS EndDate,
                    s.creation_date AS CreationDate
                FROM
                    accessibility.schedules s
                WHERE
                    s.start_date >= @dateFrom AND
                    s.end_date <= @dateTo AND
                    s.facility_id = @facilityId;",
                new {
                    dateFrom,
                    dateTo,
                    facilityId
                });
        }
    }
}
