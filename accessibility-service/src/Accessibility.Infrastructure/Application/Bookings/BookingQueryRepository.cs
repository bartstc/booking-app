using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Accessibility.Application.Bookings.Queries;
using Accessibility.Application.Bookings.Queries.GetAvailableBookingTerms;
using Accessibility.Application.Bookings.Queries.GetBookedRecordsOfFacility;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.SharedKernel;
using Core.Database;
using Core.Persistence.Postgres;
using Core.Queries;
using Dapper;
using SqlKata;
using SqlKata.Extensions;

namespace Accessibility.Infrastructure.Application.Bookings
{
    public class BookingQueryRepository : QueryRepositoryBase, IBookingQueryRepository
    {
        public BookingQueryRepository(ISqlConnectionFactory sqlConnectionFactory) : base(sqlConnectionFactory)
        {
        }

        public Task<QueryCollectionResult<BookedRecordOfFacilityDto>> GetBookedRecords(
            Guid facilityId,
            GetBookedRecordsOfFacilityQueryParams @params
        ) =>
            GetCollectionResultAsync<BookedRecordOfFacilityDto>(
                new Query()
                    .Select(
                        "b.booking_id as BookingId",
                        "r.booked_record_id as BookedRecordId",
                        "r.offer_id as OfferId",
                        "o.name as OfferName",
                        "r.employee_id as EmployeeId",
                        "e.name as EmployeeName",
                        "b.customer_id as CustomerId",
                        "r.date as DateFrom")
                    .ForPostgreSql(q => q.SelectRaw("r.date + r.duration * INTERVAL '1 minute' as DateTo"))
                    .Select(
                        "r.duration as Duration",
                        "r.status as Status",
                        "r.price as Price",
                        "r.currency as Currency")
                    .From(
                        "booking.bookings as b")
                    .Join(
                        "booking.booked_records as r", "b.booking_id", "r.booking_id")
                    .Join(
                        "facility.offers as o", "r.offer_id", "o.offer_id")
                    .Join(
                        "facility.employees as e", "r.employee_id", "e.employee_id")
                    .Where("b.facility_id", facilityId)
                    .Where("e.status", 1)
                    .WhereBetween("r.date", @params.DateFrom, @params.DateTo),
                @params
            );

        public async Task<IEnumerable<BookedTerm>> GetBookedTerms(Guid facilityId, DateTime dateFrom, DateTime dateTo)
        {
            var now = DateTime.Now;

            return (await Connection.QueryAsync<BookedTerm>(
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
                    r.date + r.duration * INTERVAL '1 minute' > @now AND
                    b.status = @status;",
                new
                {
                    facilityId, dateFrom, dateTo, now,
                    status = (int)BookingStatus.Booked
                }
            )).AsList();
        }

        public async Task<int?> GetBookingStatus(BookingId id, FacilityId facilityId)
        {
            return (await Connection.ExecuteScalarAsync<int?>(
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
