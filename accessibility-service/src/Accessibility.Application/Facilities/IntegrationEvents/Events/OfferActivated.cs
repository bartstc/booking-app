using System;

namespace Management.Facilities.Events
{
    public interface OfferActivated
    {
        Guid OfferId { get; }
    }
}
