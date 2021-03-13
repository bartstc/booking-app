using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Accessibility.Application.Configuration.Database;
using Accessibility.Application.Schedules;
using Accessibility.Application.Schedules.Queries;
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
            return await connection.QueryAsync<ScheduleDto, AvailabilityDto, ScheduleDto>(
                @"SELECT
                    s.name,
                    s.start_date AS StartDate,
                    s.end_date AS EndDate,
                    s.creation_date AS CreationDate,
                    a.schedule_id AS ScheduleId,
                    a.employee_id AS EmployeeId,
                    a.start_time AS StartTime,
                    a.end_time AS EndTime,
                    a.priority,
                    a.creator_id AS CreatorId,
                    a.creation_date AS CreationDate
                FROM
                    accessibility.schedules s
                        INNER JOIN
                    accessibility.availabilities a ON s.schedule_id = a. schedule_id
                WHERE
                    s.start_date >= @dateFrom AND
                    s.end_date <= @dateTo AND
                    s.facility_id = @facilityId;",
                (schedule, availability) => {
                    schedule.Availabilities.Add(availability);
                    return schedule;
                },
                new {
                    dateFrom,
                    dateTo,
                    facilityId
                }, splitOn: "ScheduleId");
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
