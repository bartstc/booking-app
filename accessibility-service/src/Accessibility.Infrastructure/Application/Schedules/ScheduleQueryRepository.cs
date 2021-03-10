using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Accessibility.Application.Configuration.Database;
using Accessibility.Application.Schedules;
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

        public async Task<IEnumerable<EmployeeAvailability>> GetAllAvailabilities(DateTime dateFrom, DateTime dateTo, Guid facilityId)
        {
            return await connection.QueryAsync<EmployeeAvailability>(
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
    }
}
