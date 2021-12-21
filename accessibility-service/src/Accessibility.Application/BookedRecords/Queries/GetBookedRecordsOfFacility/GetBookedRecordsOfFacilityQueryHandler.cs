using System.Threading;
using System.Threading.Tasks;
using Core.Queries;

namespace Accessibility.Application.BookedRecords.Queries.GetBookedRecordsOfFacility
{
    public class GetBookedRecordsOfFacilityQueryHandler : IQueryHandler<GetBookedRecordsOfFacilityQuery, QueryCollectionResult<BookedRecordDto>>
    {
        private readonly IBookedRecordQueryRepository repository;

        public GetBookedRecordsOfFacilityQueryHandler(IBookedRecordQueryRepository repository)
        {
            this.repository = repository;
        }

        public Task<QueryCollectionResult<BookedRecordDto>> Handle(GetBookedRecordsOfFacilityQuery request, CancellationToken cancellationToken)
        {
            return repository.GetBookedRecords(
                request.FacilityId,
                request.Params
            );
        }
    }
}
