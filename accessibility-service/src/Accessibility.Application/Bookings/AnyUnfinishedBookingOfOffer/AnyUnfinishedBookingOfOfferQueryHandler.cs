using System.Threading;
using System.Threading.Tasks;
using Accessibility.Application.Configuration.Database;
using MediatR;
using Dapper;

namespace Accessibility.Application.Bookings.AnyUnfinishedBookingOfOffer
{
    public class AnyUnfinishedBookingOfOfferQueryHandler : IRequestHandler<AnyUnfinishedBookingOfOfferQuery, bool>
    {
        private readonly ISqlConnectionFactory sqlConnectionFactory;

        public AnyUnfinishedBookingOfOfferQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
        {
            this.sqlConnectionFactory = sqlConnectionFactory;
        }

        public async Task<bool> Handle(AnyUnfinishedBookingOfOfferQuery request, CancellationToken cancellationToken)
        {
            var connection = sqlConnectionFactory.GetConnection();

            return (await connection.QueryFirstOrDefaultAsync<int?>(
                @"SELECT 1
                FROM
                    accessibility.booked_records r INNER JOIN accessibility.bookings b
                    ON r.booking_id = b.booking_id
                WHERE
                    r.offer_id = @OfferId AND
                    b.facility_id = @FacilityId AND
                    r.status = 0
                LIMIT 1;",
                new {
                    request.OfferId,
                    request.FacilityId
                })).HasValue;
        }
    }
}
