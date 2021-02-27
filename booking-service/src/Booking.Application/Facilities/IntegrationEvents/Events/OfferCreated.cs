using System;

namespace Booking.Application.Facilities.IntegrationEvents.Events
{
    public interface OfferCreated
    {
        Guid Id { get; }
        Guid FacilityId { get; }
        string Name { get; }
        decimal Price { get; }
        string Currency { get; }
        short Duration { get; }
    }
}
