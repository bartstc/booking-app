using System.Threading.Tasks;
using Booking.Application.Facilities.Commands.CreateOffer;
using Booking.Application.Facilities.IntegrationEvents.Events;
using MassTransit;
using MediatR;

namespace Booking.Application.Facilities.IntegrationEvents.EventHandling
{
    public class OfferCreatedConsumer : IConsumer<OfferCreated>
    {
        private readonly IMediator mediator;

        public OfferCreatedConsumer(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Consume(ConsumeContext<OfferCreated> context)
        {
            var message = context.Message;

            await mediator.Send(new CreateOfferCommand(
                message.Id,
                message.FacilityId,
                message.Price,
                message.Currency,
                message.Duration
            ));
        }
    }
}
