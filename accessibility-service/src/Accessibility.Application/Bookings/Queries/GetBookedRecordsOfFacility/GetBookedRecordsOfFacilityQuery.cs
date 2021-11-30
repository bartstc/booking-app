using System;
using Core.Queries;

namespace Accessibility.Application.Bookings.Queries.GetBookedRecordsOfFacility
{
    public class GetBookedRecordsOfFacilityQuery : IQuery<QueryCollectionResult<BookedRecordOfFacilityDto>>
    {
        public GetBookedRecordsOfFacilityQuery(Guid facilityId, GetBookedRecordsOfFacilityQueryParams @params)
        {
            FacilityId = facilityId;
            Params = @params;
        }

        public Guid FacilityId { get; }
        public GetBookedRecordsOfFacilityQueryParams Params { get; }
    }
}
