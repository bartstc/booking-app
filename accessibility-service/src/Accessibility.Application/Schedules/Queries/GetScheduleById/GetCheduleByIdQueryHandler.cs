using System.Threading;
using System.Threading.Tasks;
using Accessibility.Application.Configuration.Database;
using MediatR;
using Dapper;

namespace Accessibility.Application.Schedules.Queries.GetScheduleById
{
    public class GetCheduleByIdQueryHandler : IRequestHandler<GetScheduleByIdQuery, ScheduleDto>
    {
        private readonly ISqlConnectionFactory sqlConnectionFactory;

        public GetCheduleByIdQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
        {
            this.sqlConnectionFactory = sqlConnectionFactory;
        }

        public async Task<ScheduleDto> Handle(GetScheduleByIdQuery request, CancellationToken cancellationToken)
        {
            var connection = sqlConnectionFactory.GetConnection();

            var schedule = await connection.QuerySingleOrDefaultAsync<ScheduleDto>(
                @"SELECT
                    name,
                    start_date as StartDate,
                    end_date as EndDate,
                    creation_date AS CreationDate
                FROM accessibility.schedules
                WHERE schedule_id = @ScheduleId;",
                new {
                    request.ScheduleId
                });
            
            var availabilities = (await connection.QueryAsync<AvailabilityDto>(
                @"SELECT
                    employee_id AS EmployeeId,
                    start_time AS StartTime,
                    end_time AS EndTime,
                    priority,
                    creator_id AS CreatorId,
                    creation_date AS CreationDate
                FROM accessibility.availabilities
                WHERE schedule_id = @ScheduleId;",
                new {
                    request.ScheduleId
                })).AsList();
            
            schedule.Availibilities = availabilities;

            return schedule;
        }
    }
}
