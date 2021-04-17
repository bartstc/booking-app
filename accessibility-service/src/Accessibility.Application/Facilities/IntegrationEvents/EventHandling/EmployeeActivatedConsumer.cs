using System.Threading.Tasks;
using Accessibility.Application.Facilities.Commands.ChangeEmployeeStatus;
using Accessibility.Application.Facilities.IntegrationEvents.Events;
using Accessibility.Domain.SharedKernel;
using MassTransit;
using MediatR;

namespace Accessibility.Application.Facilities.IntegrationEvents.EventHandling
{
    public class EmployeeActivatedConsumer : IConsumer<EmployeeActivated>
    {
        private readonly IMediator mediator;

        public EmployeeActivatedConsumer(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Consume(ConsumeContext<EmployeeActivated> context)
        {
            var id = context.Message.EmployeeId;

            await mediator.Send(new ChangeEmployeeStatusCommand(
                new EmployeeId(id),
                EntityStatus.active
            ));
        }
    }
}
