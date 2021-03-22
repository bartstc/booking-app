using System.Threading.Tasks;
using Accessibility.Application.Bookings.Commands.ProcessBookingRequest;
using Accessibility.Application.Bookings.IntegrationEvents.Events;
using MassTransit;
using MediatR;

namespace Accessibility.Application.Bookings.IntegrationEvents.EventHandling
{
    public class BookingRequestedConsumer : IConsumer<BookingRequested>
    {
        private readonly IMediator mediator;

        public BookingRequestedConsumer(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Consume(ConsumeContext<BookingRequested> context)
        {
            await mediator.Send(new ProcessBookingRequestCommand(context.Message.BookingId, context.Message.FacilityId));
        }
    }
}
