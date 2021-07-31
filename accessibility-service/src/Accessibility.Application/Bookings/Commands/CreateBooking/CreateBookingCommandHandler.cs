using System.Threading;
using System.Threading.Tasks;
using Accessibility.Application.Bookings.Commands.CreateBookingRequest;
using Core.Commands;
using Core.IntegrationEvents;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.CreateBooking
{
    public class CreateBookingCommandHandler : ICommandHandler<CreateBookingCommand>
    {
        private readonly IRequestBus<CreateBookingRequest.ProcessBookingRequest> requestBus;

        public CreateBookingCommandHandler(IRequestBus<CreateBookingRequest.ProcessBookingRequest> requestBus)
        {
            this.requestBus = requestBus;
        }

        public async Task<Unit> Handle(CreateBookingCommand request, CancellationToken cancellationToken)
        {
            var response = await requestBus.GetResponseAsync<BookingRequestProcessingResult>
            (
                new CreateBookingRequest.ProcessBookingRequest(request)
            );

            return Unit.Value;
        }
    }
}
