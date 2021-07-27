using System.Threading.Tasks;
using AutoMapper;
using Community.Application.Members.Commands.AddFulfilledBooking;
using ExternalEvents.Accessibility.BookingRecords;
using MassTransit;
using MediatR;

namespace Community.Infrastructure.IntegrationEvents.Members
{
    public class BookingRecordFulfilledConsumer : IConsumer<BookingRecordFulfilled>
    {
        private readonly IMapper mapper;
        private readonly IMediator mediator;

        public BookingRecordFulfilledConsumer(IMapper mapper, IMediator mediator)
        {
            this.mapper = mapper;
            this.mediator = mediator;
        }

        public async Task Consume(ConsumeContext<BookingRecordFulfilled> context)
        {
            var command = mapper.Map<AddFulfilledBookingCommand>(context.Message);
            await mediator.Send(command);
        }
    }
}
