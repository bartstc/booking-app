using System;
using Accessibility.Application.Configuration.Database;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.SharedKernel;
using Dapper;

namespace Accessibility.Application.Schedules.DomainServices
{
    public class SchedulePeriodOfTimeChecker : ISchedulePeriodOfTimeChecker
    {
        private readonly ISqlConnectionFactory sqlConnectionFactory;

        public SchedulePeriodOfTimeChecker(ISqlConnectionFactory sqlConnectionFactory)
        {
            this.sqlConnectionFactory = sqlConnectionFactory;
        }

        public bool IsAvailable(FacilityId facilityId, DateTime startDate, DateTime endDate)
        {
            var connection = sqlConnectionFactory.GetConnection();

            var result = connection.QuerySingleOrDefault<int?>(
                @"SELECT 1
                FROM accessibility.schedules
                WHERE
                    facility_id = @FacilityId AND
                    (
                        start_date BETWEEN @StartDate AND @EndDate OR
                        end_date BETWEEN @StartDate AND @EndDate OR
                        start_date = @StartDate OR
                        end_date = @EndDate
                    )
                LIMIT 1;",
                new {
                    FacilityId = facilityId.Value,
                    StartDate = startDate,
                    EndDate = endDate
                });
            
            return !result.HasValue;
        }
    }
}
