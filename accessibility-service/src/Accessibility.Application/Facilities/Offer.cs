using Accessibility.Domain.SharedKernel;

namespace Accessibility.Application.Facilities
{
    public class Offer
    {
        private Offer()
        {
        }

        public Offer(OfferId id, FacilityId facilityId, string name, decimal price, string currency, short duration, EntityStatus status)
        {
            Id = id;
            FacilityId = facilityId;
            Name = name;
            Price = price;
            Currency = currency;
            Duration = duration;
            Status = status;
        }

        public OfferId Id { get; }
        public FacilityId FacilityId { get; }
        public string Name { get; }
        public decimal Price { get; }
        public string Currency { get; }
        public short Duration { get; }
        public EntityStatus Status { get; internal set; }
    }
}
