using System.Threading.Tasks;
using AutoMapper;
using Community.Application.Members.Commands.AddCompletedBookings;
using ExternalEvents.Accessibility.Bookings;
using MassTransit;
using MediatR;

namespace Community.Infrastructure.IntegrationEvents.Members
{
    public class BookingCompletedConsumer : IConsumer<BookingCompleted>
    {
        private readonly IMapper mapper;
        private readonly IMediator mediator;

        public BookingCompletedConsumer(IMapper mapper, IMediator mediator)
        {
            this.mapper = mapper;
            this.mediator = mediator;
        }

        public async Task Consume(ConsumeContext<BookingCompleted> context)
        {
            var command = mapper.Map<AddCompletedBookingsCommand>(context.Message);
            await mediator.Send(command);
        }
    }
}
