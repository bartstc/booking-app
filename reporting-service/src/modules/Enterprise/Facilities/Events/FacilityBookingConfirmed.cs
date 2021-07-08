using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Core.Domain;

namespace Enterprise.Facilities.Events
{
    public class FacilityBookingConfirmed : IEvent
    {
        [JsonConstructor]
        public FacilityBookingConfirmed(Guid facilityId, IEnumerable<OfferConfirmed> offers, Guid customerId)
        {
            FacilityId = facilityId;
            Offers = offers;
            CustomerId = customerId;
        }

        public Guid FacilityId { get; }
        public IEnumerable<OfferConfirmed> Offers { get; }
        public Guid CustomerId { get; }
    }
}
