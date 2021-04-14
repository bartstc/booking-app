using System.Threading.Tasks;
using Accessibility.Application.Facilities.Commands.CreateOffer;
using Management.Facilities.Events;
using MassTransit;
using MediatR;

namespace Accessibility.Application.Facilities.IntegrationEvents.EventHandling
{
    public class OfferAddedConsumer : IConsumer<OfferAdded>
    {
        private readonly IMediator mediator;

        public OfferAddedConsumer(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Consume(ConsumeContext<OfferAdded> context)
        {
            var message = context.Message;

            await mediator.Send(new CreateOfferCommand(
                message.Id,
                message.FacilityId,
                message.Name,
                message.Price,
                message.Currency,
                message.Duration
            ));
        }
    }
}
