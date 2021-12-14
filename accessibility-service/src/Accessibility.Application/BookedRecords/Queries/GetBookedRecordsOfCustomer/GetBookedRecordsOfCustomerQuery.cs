using System;
using Core.Queries;

namespace Accessibility.Application.BookedRecords.Queries.GetBookedRecordsOfCustomer
{
    public class GetBookedRecordsOfCustomerQuery : IQuery<QueryCollectionResult<BookedRecordDto>>
    {
        public GetBookedRecordsOfCustomerQuery(
            Guid customerId,
            GetBookedRecordsOfCustomerQueryParams @params)
        {
            CustomerId = customerId;
            Params = @params;
        }

        public Guid CustomerId { get; }
        public GetBookedRecordsOfCustomerQueryParams Params { get; }
    }
}
