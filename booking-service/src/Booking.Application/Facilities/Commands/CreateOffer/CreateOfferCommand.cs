using System;
using MediatR;

namespace Booking.Application.Facilities.Commands.CreateOffer
{
    public class CreateOfferCommand : IRequest
    {
        public CreateOfferCommand(Guid id, Guid facilityId, decimal price, string currency, short duration)
        {
            Id = id;
            FacilityId = facilityId;
            Price = price;
            Currency = currency;
            Duration = duration;
        }

        public Guid Id { get; }
        public Guid FacilityId { get; }
        public decimal Price { get; }
        public string Currency { get; }
        public short Duration { get; }
    }
}
