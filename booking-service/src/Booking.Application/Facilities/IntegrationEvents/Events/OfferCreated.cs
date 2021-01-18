using System;

namespace Booking.Application.Facilities.IntegrationEvents.Events
{
    public class OfferCreated
    {
        public OfferCreated(Guid id, Guid facilityId, decimal price, string currency, short duration)
        {
            this.Id = id;
            this.FacilityId = facilityId;
            this.Price = price;
            this.Currency = currency;
            this.Duration = duration;

        }
        public Guid Id { get; }
        public Guid FacilityId { get; }
        public decimal Price { get; }
        public string Currency { get; }
        public short Duration { get; }
    }
}
