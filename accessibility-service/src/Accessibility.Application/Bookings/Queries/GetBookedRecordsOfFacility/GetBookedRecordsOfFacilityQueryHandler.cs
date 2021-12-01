using System.Threading;
using System.Threading.Tasks;
using Core.Queries;

namespace Accessibility.Application.Bookings.Queries.GetBookedRecordsOfFacility
{
    public class GetBookedRecordsOfFacilityQueryHandler : IQueryHandler<GetBookedRecordsOfFacilityQuery, QueryCollectionResult<BookedRecordOfFacilityDto>>
    {
        private readonly IBookingQueryRepository repository;

        public GetBookedRecordsOfFacilityQueryHandler(IBookingQueryRepository repository)
        {
            this.repository = repository;
        }

        public Task<QueryCollectionResult<BookedRecordOfFacilityDto>> Handle(GetBookedRecordsOfFacilityQuery request, CancellationToken cancellationToken)
        {
            return repository.GetBookedRecords(
                request.FacilityId,
                request.Params
            );
        }
    }
}
