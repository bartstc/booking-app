using System;

namespace Booking.Application.Facilities.IntegrationEvents.Events
{
    public class OfferCreated
    {
        public Guid Id { get; }
        public Guid FacilityId { get; }
        public decimal Price { get; }
        public string Currency { get; }
        public short Duration { get; }
    }
}
