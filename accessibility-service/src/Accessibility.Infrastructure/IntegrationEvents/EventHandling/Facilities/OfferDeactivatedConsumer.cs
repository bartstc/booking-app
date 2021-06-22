using System.Threading.Tasks;
using Accessibility.Application.Facilities;
using Accessibility.Application.Facilities.Commands.ChangeOfferStatus;
using Accessibility.Domain.SharedKernel;
using Management.Facilities.Events;
using MassTransit;
using MediatR;

namespace Accessibility.Infrastructure.IntegrationEvents.EventHandling.Facilities
{
    public class OfferDeactivatedConsumer : IConsumer<OfferDeactivated>
    {
        private readonly IMediator mediator;

        public OfferDeactivatedConsumer(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Consume(ConsumeContext<OfferDeactivated> context)
        {
            var id = context.Message.OfferId;

            await mediator.Send(new ChangeOfferStatusCommand(
                new OfferId(id),
                EntityStatus.inactive
            ));
        }
    }
}
