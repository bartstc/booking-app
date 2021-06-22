using System.Threading.Tasks;
using Accessibility.Application.Facilities.Commands.CreateEmployee;
using Accessibility.Domain.SharedKernel;
using Management.Facilities.Events;
using MassTransit;
using MediatR;

namespace Accessibility.Infrastructure.IntegrationEvents.EventHandling.Facilities
{
    public class EmployeeAddedConsumer : IConsumer<EmployeeAdded>
    {
        private readonly IMediator mediator;

        public EmployeeAddedConsumer(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Consume(ConsumeContext<EmployeeAdded> context)
        {
            var dto = context.Message.Dto;

            await mediator.Send(new CreateEmployeeCommand(
                new EmployeeId(dto.EmployeeId),
                new FacilityId(dto.FacilityId),
                dto.Name,
                dto.Position,
                dto.Status
            ));
        }
    }
}
