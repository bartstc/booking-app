using System.Threading.Tasks;
using Accessibility.Infrastructure.IntegrationEvents.Events.Facility;
using Accessibility.Domain.SharedKernel;
using MassTransit;
using MediatR;
using Accessibility.Application.Facilities.Commands.ChangeEmployeeStatus;
using Accessibility.Application.Facilities;

namespace Accessibility.Infrastructure.IntegrationEvents.EventHandling.Facilities
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
