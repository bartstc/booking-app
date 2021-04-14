using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Accessibility.Application.Availabilities.Queries;
using Accessibility.Application.Configuration.Database;
using Accessibility.Application.Schedules;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.SharedKernel;
using Dapper;

namespace Accessibility.Infrastructure.Application.Availabilities
{
    public class AvailabilityQueryRepository : IAvailabilityQueryRepository
    {
        private readonly IDbConnection connection;

        public AvailabilityQueryRepository(ISqlConnectionFactory sqlConnectionFactory)
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

        public async Task<IEnumerable<AvailabilityDto>> GetAvailabilities(FacilityId facilityId, ScheduleId scheduleId, DateTime startTime, DateTime endTime)
        {
            return await connection.QueryAsync<AvailabilityDto>(
                @"SELECT
                    a.employee_id AS EmployeeId,
                    a.start_time AS StartTime,
                    a.end_time AS EndTime,
                    a.priority,
                    a.creator_id AS CreatorId,
                    a.creation_date AS CreationDate
                FROM
                    accessibility.availabilities a
                        INNER JOIN
                    accessibility.schedules s ON a.schedule_id = s.schedule_id
                WHERE
                    a.schedule_id = @ScheduleId AND
                    s.facility_id = @FacilityId AND
                    a.start_time >= @startTime AND
                    a.end_time <= @endTime;",
                new {
                    ScheduleId = scheduleId.Value,
                    FacilityId = facilityId.Value,
                    startTime,
                    endTime
                });
        }

        public async Task<IEnumerable<AvailabilityDto>> GetAvailabilities(FacilityId facilityId, ScheduleId scheduleId, DateTime startTime, DateTime endTime, EmployeeId employeeId)
        {
            return await connection.QueryAsync<AvailabilityDto>(
                @"SELECT
                    a.employee_id AS EmployeeId,
                    a.start_time AS StartTime,
                    a.end_time AS EndTime,
                    a.priority,
                    a.creator_id AS CreatorId,
                    a.creation_date AS CreationDate
                FROM
                    accessibility.availabilities a
                        INNER JOIN
                    accessibility.schedules s ON a.schedule_id = s.schedule_id
                WHERE
                    a.schedule_id = @ScheduleId AND
                    s.facility_id = @FacilityId AND
                    a.start_time >= @startTime AND
                    a.end_time <= @endTime AND
                    a.employee_id = @EmployeeId;",
                new {
                    ScheduleId = scheduleId.Value,
                    FacilityId = facilityId.Value,
                    startTime,
                    endTime,
                    EmployeeId = employeeId.Value
                });
        }
    }
}
