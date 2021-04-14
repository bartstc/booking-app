using System;

namespace Management.Facilities.Events
{
    public interface OfferAdded
    {
        Guid Id { get; }
        Guid FacilityId { get; }
        string Name { get; }
        decimal Price { get; }
        string Currency { get; }
        short Duration { get; }
    }
}
