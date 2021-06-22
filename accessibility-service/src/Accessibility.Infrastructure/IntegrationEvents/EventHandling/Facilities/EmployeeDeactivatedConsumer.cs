using System.Threading.Tasks;
using Accessibility.Infrastructure.IntegrationEvents.Events.Facility;
using Accessibility.Domain.SharedKernel;
using MassTransit;
using MediatR;
using Accessibility.Application.Facilities.Commands.ChangeEmployeeStatus;
using Accessibility.Application.Facilities;

namespace Accessibility.Infrastructure.IntegrationEvents.EventHandling.Facilities
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
