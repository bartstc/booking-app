using System;
using System.Data;
using System.Threading.Tasks;
using Accessibility.Application.Configuration.Database;
using Accessibility.Application.Facilities;
using Dapper;

namespace Accessibility.Infrastructure.Application.Facilities
{
    public class OfferQueryRepository : IOfferQueryRepository
    {
        private readonly IDbConnection connection;

        public OfferQueryRepository(ISqlConnectionFactory sqlConnectionFactory)
        {
            connection = sqlConnectionFactory.GetConnection();
        }

        public async Task<short> GetOfferDuration(Guid facilityId, Guid offerId) =>
            await connection.QueryFirstOrDefaultAsync<short>(
                @"SELECT
                    duration
                FROM
                    facility.offers
                WHERE
                    facility_id = @facilityId AND
                    offer_id = @offerId AND
                    status = @status
                limit 1;",
                new
                {
                    facilityId,
                    offerId,
                    status = EntityStatus.active
                });
    }
}
