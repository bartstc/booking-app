using System.Threading;
using System.Threading.Tasks;
using Accessibility.Application.Configuration.Database;
using MediatR;
using Dapper;

namespace Accessibility.Application.Bookings.Queries.AnyUnfinishedBookingOfEmployee
{
    public class AnyUnfinishedBookingOfEmployeeQueryHandler : IRequestHandler<AnyUnfinishedBookingOfEmployeeQuery, bool>
    {
        private readonly ISqlConnectionFactory sqlConnectionFactory;

        public AnyUnfinishedBookingOfEmployeeQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
        {
            this.sqlConnectionFactory = sqlConnectionFactory;
        }

        public async Task<bool> Handle(AnyUnfinishedBookingOfEmployeeQuery request, CancellationToken cancellationToken)
        {
            var connection = sqlConnectionFactory.GetConnection();

            return (await connection.QueryFirstOrDefaultAsync<int?>(
                @"SELECT 1
                FROM
                    accessibility.booked_records r INNER JOIN accessibility.bookings b
                    ON r.booking_id = b.booking_id
                WHERE
                    r.employee_id = @EmployeeId AND
                    b.facility_id = @FacilityId AND
                    r.status = 0
                LIMIT 1;",
                new {
                    request.EmployeeId,
                    request.FacilityId
                })).HasValue;
        }
    }
}
