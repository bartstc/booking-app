using System;
using System.Collections.Generic;
using Core.Commands;

namespace Enterprise.Facilities.Commands.ConfirmBooking
{
    public record ConfirmBookingCommand(
        Guid FacilityId,
        IEnumerable<OfferConfirmed> Offers,
        Guid CustomerId
    ) : ICommand;
}
