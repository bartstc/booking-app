using System.Threading;
using System.Threading.Tasks;
using Accessibility.Application.Configuration.Database;
using MediatR;
using Dapper;
using System.Collections.Generic;

namespace Accessibility.Application.Bookings.GetBookedRecordsOfFacility
{
    public class GetBookedRecordsOfFacilityQueryHandler : IRequestHandler<GetBookedRecordsOfFacilityQuery, List<BookedRecordOfFacilityDto>>
    {
        private readonly ISqlConnectionFactory sqlConnectionFactory;

        public GetBookedRecordsOfFacilityQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
        {
            this.sqlConnectionFactory = sqlConnectionFactory;
        }

        public async Task<List<BookedRecordOfFacilityDto>> Handle(GetBookedRecordsOfFacilityQuery request, CancellationToken cancellationToken)
        {
            var connection = sqlConnectionFactory.GetConnection();

            return (await connection.QueryAsync<BookedRecordOfFacilityDto>(
                "SELECT * FROM accessibility.booked_records_of_facility(@facilityId, @dateFrom, @dateTo);",
                new
                {
                    request.FacilityId,
                    request.DateFrom,
                    request.DateTo
                }))
                .AsList();
        }
    }
}
