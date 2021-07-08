using System;
using System.Collections.Generic;
using System.Linq;
using Enterprise.Facilities.Events;
using Marten.Events.Aggregation;

namespace Enterprise.Facilities.Projections
{
    // ilość zamawianych usług w kolejności malejącej
    public class FacilityOfferReport
    {
        public Guid Id { get; set; }
        
        public List<OfferCount> ConfirmedQuantities { get; }

        public FacilityOfferReport()
        {
            ConfirmedQuantities = new List<OfferCount>();
        }
    }

    public class OfferCount
    {
        public OfferCount(Guid offerId)
        {
            OfferId = offerId;
        }

        public Guid OfferId { get; }
        public long Count { get; internal set; }
    }

    public class FacilityOfferReportProjection : AggregateProjection<FacilityOfferReport>
    {
        public void Apply(FacilityBookingConfirmed @event, FacilityOfferReport view)
        {
            foreach (var offerConfirmed in @event.Offers)
            {
                var offer = view.ConfirmedQuantities.FirstOrDefault(o => o.OfferId == offerConfirmed.OfferId);

                if (offer == null)
                {
                    offer = new OfferCount(offerConfirmed.OfferId);
                    view.ConfirmedQuantities.Add(offer);
                }

                offer.Count++;
            }
        }
    }
}
