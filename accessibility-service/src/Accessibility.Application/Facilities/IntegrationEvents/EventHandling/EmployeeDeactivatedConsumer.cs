using System.Threading.Tasks;
using Accessibility.Application.Facilities.Commands.ChangeEmployeeStatus;
using Accessibility.Application.Facilities.IntegrationEvents.Events;
using Accessibility.Domain.SharedKernel;
using MassTransit;
using MediatR;

namespace Accessibility.Application.Facilities.IntegrationEvents.EventHandling
{
    public class EmployeeDeactivatedConsumer : IConsumer<EmployeeDeactivated>
    {
        private readonly IMediator mediator;

        public EmployeeDeactivatedConsumer(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Consume(ConsumeContext<EmployeeDeactivated> context)
        {
            var id = context.Message.EmployeeId;

            await mediator.Send(new ChangeEmployeeStatusCommand(
                new EmployeeId(id),
                EntityStatus.inactive
            ));
        }
    }
}
