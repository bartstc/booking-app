using System;
using System.Threading.Tasks;
using Accessibility.Application.Configuration.Database;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SharedKernel;
using Dapper;

namespace Accessibility.Application.Bookings.DomainServices
{
    public class BookingPeriodOfTimeChecker : IBookingPeriodOfTimeChecker
    {
        private readonly ISqlConnectionFactory sqlConnectionFactory;

        public BookingPeriodOfTimeChecker(ISqlConnectionFactory sqlConnectionFactory)
        {
            this.sqlConnectionFactory = sqlConnectionFactory;
        }

        public async Task<bool> IsRecordAvailable(
            BookingId bookingId,
            FacilityId facilityId,
            EmployeeId employeeId,
            DateTime startDate,
            DateTime endDate)
        {
            var connection = sqlConnectionFactory.GetConnection();

            var result = await connection.QueryFirstOrDefaultAsync<int?>(
                @"SELECT 1
                FROM
                    booking.bookings b INNER JOIN
                    booking.booked_records r ON b.booking_id = r.booking_id
                WHERE
                    b.booking_id != @BookingId AND
                    b.status = @Status AND
                    b.facility_id = @FacilityId AND
                    r.status = @RecordStatus AND
                    r.employee_id = @EmployeeId AND
                    r.date < @EndDate AND
                    @StartDate < r.date + r.duration * INTERVAL '1 minute';",
                    new
                    {
                        BookingId = bookingId.Value,
                        Status = (int)BookingStatus.Booked,
                        FacilityId = facilityId.Value,
                        RecordStatus = (int)BookedRecordStatus.Booked,
                        EmployeeId = employeeId.Value,
                        StartDate = startDate,
                        EndDate = endDate
                    }
            );

            return !result.HasValue;
        }
    }
}
