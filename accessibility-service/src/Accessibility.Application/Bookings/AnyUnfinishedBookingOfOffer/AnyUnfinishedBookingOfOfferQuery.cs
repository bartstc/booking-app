using System;
using MediatR;

namespace Accessibility.Application.Bookings.AnyUnfinishedBookingOfOffer
{
    public class AnyUnfinishedBookingOfOfferQuery : IRequest<bool>
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
