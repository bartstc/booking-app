using Booking.Application.Facilities.IntegrationEvents.Events;
using MediatR;

namespace Booking.Application.Facilities.Commands.CreateOffer
{
    public class CreateOfferCommand : IRequest
    {
        public CreateOfferCommand(OfferCreated offer)
        {
            Offer = offer;
        }

        public OfferCreated Offer { get; }
    }
}
