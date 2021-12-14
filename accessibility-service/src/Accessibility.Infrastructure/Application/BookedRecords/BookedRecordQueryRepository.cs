using System;
using System.Threading.Tasks;
using Accessibility.Application.BookedRecords.Queries;
using Accessibility.Application.BookedRecords.Queries.GetBookedRecordsOfCustomer;
using Core.Database;
using Core.Persistence.Postgres;
using Core.Queries;
using SqlKata;
using SqlKata.Extensions;

namespace Accessibility.Infrastructure.Application.BookedRecords
{
    public class BookedRecordQueryRepository : QueryRepositoryBase, IBookedRecordQueryRepository
    {
        public BookedRecordQueryRepository(ISqlConnectionFactory sqlConnectionFactory) : base(sqlConnectionFactory)
        {
        }

        public Task<QueryCollectionResult<BookedRecordDto>> GetBookedRecords(
            Guid customerId,
            GetBookedRecordsOfCustomerQueryParams @params
        ) =>
            GetCollectionResultAsync<BookedRecordDto>(
                new Query()
                    .Select(
                        "b.booking_id as BookingId",
                        "r.booked_record_id as BookedRecordId",
                        "r.offer_id as OfferId",
                        "o.name as OfferName",
                        "r.employee_id as EmployeeId",
                        "e.name as EmployeeName",
                        @params.IsMadeManually ? "b.customer_id as CustomerId" : "b.public_customer_id as CustomerId",
                        "b.facility_id as FacilityId",
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
                    .Where(@params.IsMadeManually ? "b.customer_id" : "b.public_customer_id", customerId)
                    .Where("e.status", 1),
                @params
            );
    }
}
