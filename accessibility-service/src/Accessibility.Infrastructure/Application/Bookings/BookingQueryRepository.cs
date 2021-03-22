using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Accessibility.Application.Bookings.Queries;
using Accessibility.Application.Bookings.Queries.GetAvailableBookingTerms;
using Accessibility.Application.Configuration.Database;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.SharedKernel;
using Dapper;

namespace Accessibility.Infrastructure.Application.Bookings
{
    public class BookingQueryRepository : IBookingQueryRepository
    {
        private readonly IDbConnection connection;

        public BookingQueryRepository(ISqlConnectionFactory sqlConnectionFactory)
        {
            connection = sqlConnectionFactory.GetConnection();
        }

        public async Task<IEnumerable<BookedTerm>> GetBookedTerms(Guid facilityId, DateTime dateFrom, DateTime dateTo)
        {
            var now = DateTime.Now;

            return (await connection.QueryAsync<BookedTerm>(
                @"SELECT
                    r.employee_id as EmployeeId,
                    r.date as DateFrom,
                    r.date + r.duration * INTERVAL '1 minute' as DateTo
                FROM
                    booking.bookings b
                        INNER JOIN
                    booking.booked_records r ON b.booking_id = r.booking_id
                WHERE
                    b.facility_id = @facilityId AND
                    r.date BETWEEN @dateFrom::timestamp AND @dateTo::timestamp AND
                    r.date + r.duration * INTERVAL '1 minute' > @now;",
                new
                {
                    facilityId, dateFrom, dateTo, now
                }
            )).AsList();
        }

        public async Task<int?> GetBookingStatus(BookingId id, FacilityId facilityId)
        {
            return (await connection.ExecuteScalarAsync<int?>(
                @"SELECT
                    b.status
                FROM
                    booking.bookings b
                WHERE
                    b.booking_id = @Id AND
                    b.facility_id = @FacilityId",
            new
            {
                Id = id.Value,
                FacilityId = facilityId.Value
            }));
        }
    }
}
