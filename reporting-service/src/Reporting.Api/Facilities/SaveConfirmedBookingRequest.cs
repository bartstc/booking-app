using System;
using System.Collections.Generic;
using Enterprise.Facilities;

namespace Reporting.Api.Facilities
{
    public record ConfirmBookingRequest(
        IEnumerable<OfferConfirmed> Offers,
        Guid CustomerId
    );
}
