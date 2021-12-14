using System.Threading;
using System.Threading.Tasks;
using Core.Queries;

namespace Accessibility.Application.BookedRecords.Queries.GetBookedRecordsOfCustomer
{
    public class GetBookedRecordsOfCustomerQueryHandler : IQueryHandler<GetBookedRecordsOfCustomerQuery, QueryCollectionResult<BookedRecordDto>>
    {
        private readonly IBookedRecordQueryRepository repository;

        public GetBookedRecordsOfCustomerQueryHandler(IBookedRecordQueryRepository repository)
        {
            this.repository = repository;
        }

        public Task<QueryCollectionResult<BookedRecordDto>> Handle(GetBookedRecordsOfCustomerQuery request, CancellationToken cancellationToken)
        {
            return repository.GetBookedRecords(request.CustomerId, request.Params);
        }
    }
}
