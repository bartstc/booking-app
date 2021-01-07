using System.Threading;
using System.Threading.Tasks;
using Booking.Application.Configuration.Database;
using MediatR;
using Dapper;
using System.Collections.Generic;

namespace Booking.Application.Bookings.Queries.GetBookedRecordsOfFacility
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
                @"SELECT
                    b.booking_id as BookingId,
                    r.employee_id as EmployeeId,
                    r.offer_id as OfferId,
                    r.price as Price,
                    r.currency as Currency,
                    r.status as Status,
                    r.date as Date,
                    r.duration as Duration
                FROM
                    booking.bookings b INNER JOIN
                    booking.booked_records r ON b.booking_id = r.booking_id
                WHERE
                    b.facility_id = @FacilityId AND
                    r.date BETWEEN @DateFrom::timestamp AND @DateTo::timestamp",
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
