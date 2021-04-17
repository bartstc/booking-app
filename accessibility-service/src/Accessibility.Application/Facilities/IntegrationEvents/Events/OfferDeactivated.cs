using System;

namespace Management.Facilities.Events
{
    public interface OfferDeactivated
    {
        Guid OfferId { get; }
    }
}
