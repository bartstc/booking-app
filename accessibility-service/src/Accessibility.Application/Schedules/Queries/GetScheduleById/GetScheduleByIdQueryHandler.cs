using System.Threading;
using System.Threading.Tasks;
using Dapper;
using Core.Database;
using Core.Queries;

namespace Accessibility.Application.Schedules.Queries.GetScheduleById
{
    public class GetScheduleByIdQueryHandler : IQueryHandler<GetScheduleByIdQuery, ScheduleDto>
    {
        private readonly ISqlConnectionFactory sqlConnectionFactory;

        public GetScheduleByIdQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
        {
            this.sqlConnectionFactory = sqlConnectionFactory;
        }

        public async Task<ScheduleDto> Handle(GetScheduleByIdQuery request, CancellationToken cancellationToken)
        {
            var connection = sqlConnectionFactory.GetConnection();

            var schedule = await connection.QuerySingleOrDefaultAsync<ScheduleDto>(
                @"SELECT
                    schedule_id as ScheduleId,
                    name,
                    start_date as StartDate,
                    end_date as EndDate,
                    creation_date AS CreationDate
                FROM accessibility.schedules
                WHERE schedule_id = @ScheduleId;",
                new {
                    request.ScheduleId
                });

            return schedule;
        }
    }
}
