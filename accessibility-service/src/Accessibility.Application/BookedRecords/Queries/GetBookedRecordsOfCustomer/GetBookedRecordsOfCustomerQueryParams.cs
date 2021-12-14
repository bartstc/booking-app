using Core.Queries;

namespace Accessibility.Application.BookedRecords.Queries.GetBookedRecordsOfCustomer
{
    public class GetBookedRecordsOfCustomerQueryParams : QueryParams
    {
        public bool IsMadeManually { get; set; } = true;
    }
}
