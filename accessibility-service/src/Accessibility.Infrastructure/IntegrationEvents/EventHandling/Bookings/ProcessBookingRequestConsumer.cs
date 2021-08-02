using System.Threading.Tasks;
using Accessibility.Application.Bookings.Commands.CreateBookingRequest;
using Accessibility.Application.Bookings.Commands.ProcessBookingRequest;
using MassTransit;
using MediatR;

namespace Accessibility.Infrastructure.IntegrationEvents.EventHandling.Bookings
{
    public class ProcessBookingRequestConsumer : IConsumer<ProcessBookingRequest>
    {
        private readonly IMediator mediator;

        public ProcessBookingRequestConsumer(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Consume(ConsumeContext<ProcessBookingRequest> context)
        {
            await mediator.Send(new ProcessBookingRequestCommand(context.Message.Command));

            await context.RespondAsync<BookingRequestProcessingResult>(new
            {
                IsBooked = true
            });
        }
    }
}
