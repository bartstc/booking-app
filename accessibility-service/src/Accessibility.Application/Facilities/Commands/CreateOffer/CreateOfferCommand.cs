using System;
using Core.Commands;

namespace Accessibility.Application.Facilities.Commands.CreateOffer
{
    public class CreateOfferCommand : ICommand
    {
        public CreateOfferCommand(Guid id, Guid facilityId, string name, decimal price, string currency, short duration)
        {
            Id = id;
            FacilityId = facilityId;
            Name = name;
            Price = price;
            Currency = currency;
            Duration = duration;
        }

        public Guid Id { get; }
        public Guid FacilityId { get; }
        public string Name { get; set; }
        public decimal Price { get; }
        public string Currency { get; }
        public short Duration { get; }
    }
}
