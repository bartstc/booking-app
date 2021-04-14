using System.Threading.Tasks;
using Accessibility.Application.Facilities.Commands.ChangeOfferStatus;
using Accessibility.Domain.SharedKernel;
using Management.Facilities.Events;
using MassTransit;
using MediatR;

namespace Accessibility.Application.Facilities.IntegrationEvents.EventHandling
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
            var dto = context.Message.Dto;

            await mediator.Send(new ChangeOfferStatusCommand(
                new OfferId(dto.OfferId),
                dto.Status
            ));
        }
    }
}
