using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Dapper;
using System.Collections.Generic;
using Core.Database;

namespace Accessibility.Application.Bookings.Queries.GetBookedRecordsOfFacility
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
                    r.booked_record_id as BookedRecordId,
                    r.offer_id as OfferId,
                    o.name as OfferName,
                    r.employee_id as EmployeeId,
                    null as EmployeeName,
                    b.customer_id as CustomerId,
                    r.date as DateFrom,
                    r.date + r.duration * INTERVAL '1 minute' as DateTo,
                    r.duration as Duration,
                    r.status as Status,
                    r.price as Price,
                    r.currency as Currency
                FROM
                    booking.bookings b
                        INNER JOIN
                    booking.booked_records r ON b.booking_id = r.booking_id
                        INNER JOIN
                    facility.offers o ON r.offer_id = o.offer_id
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
