using Core.Domain;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Bookings.BookedRecords
{
    public class BookedEvent : DomainEventBase
    {
        public BookedEvent(BookedRecordId bookedRecordId, CustomerId customerId, FacilityId facilityId, OfferId offerId) 
        {
            BookedRecordId = bookedRecordId;
            CustomerId = customerId;
            FacilityId = facilityId;
            OfferId = offerId;
        }

        public BookedRecordId BookedRecordId { get; }
        public CustomerId CustomerId { get; }
        public FacilityId FacilityId { get; }
        public OfferId OfferId { get; }
    }
}