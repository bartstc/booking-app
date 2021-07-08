using System;
using Core.Queries;

namespace Accessibility.Application.Bookings.Queries.AnyUnfinishedBookingOfOffer
{
    public class AnyUnfinishedBookingOfOfferQuery : IQuery<bool>
    {
        public AnyUnfinishedBookingOfOfferQuery(Guid facilityId, Guid offerId)
        {
            FacilityId = facilityId;
            OfferId = offerId;
        }

        public Guid FacilityId { get; }
        public Guid OfferId { get; }
    }
}
