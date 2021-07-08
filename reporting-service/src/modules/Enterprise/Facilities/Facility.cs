using System;
using System.Collections.Generic;
using System.Linq;
using Core.Domain;
using Enterprise.Facilities.Events;
using Enterprise.Facilities.Offers;

namespace Enterprise.Facilities
{
    public class Facility : AggregateRootBase
    {
        // serialization
        public Facility()
        {
            Offers = new List<Offer>();
        }

        public List<Offer> Offers { get; private set; }

        public static Facility Initialize(Guid id)
        {
            var facility = new Facility();
            facility.Id = id;
            return facility; 
        }

        public void ConfirmBooking(IEnumerable<OfferConfirmed> offers, Guid customerId)
        {
            var @event = new FacilityBookingConfirmed(Id, offers, customerId);

            Enqueue(@event);
            Apply(@event);
        }

        public void Apply(FacilityBookingConfirmed @event)
        {
            foreach (var offerConfirmed in @event.Offers)
            {
                var offer = Offers.FirstOrDefault(o => o.Id == offerConfirmed.OfferId);

                if (offer == null)
                {
                    offer = new Offer(offerConfirmed.OfferId);
                    Offers.Add(offer);
                }

                offer.ConfirmedCount++;
            }
        }
    }
}
