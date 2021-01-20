using Booking.Domain.SharedKernel;

namespace Booking.Application.Facilities
{
    public class Offer
    {
        private Offer()
        {
        }

        public Offer(OfferId id, FacilityId facilityId, decimal price, string currency, short duration)
        {
            Id = id;
            FacilityId = facilityId;
            Price = price;
            Currency = currency;
            Duration = duration;
        }

        public OfferId Id { get; }
        public FacilityId FacilityId { get; }
        public decimal Price { get; }
        public string Currency { get; }
        public short Duration { get; }
    }
}
