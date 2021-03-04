using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Accessibility.Application.Bookings.IntegrationEvents.Events;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SharedKernel;
using MassTransit;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.CreateBookingOrder
{
    public class BookCommandHandler : IRequestHandler<BookCommand>
    {
        private readonly ISendEndpointProvider sendEndpointProvider;

        public BookCommandHandler(ISendEndpointProvider sendEndpointProvider)
        {
            this.sendEndpointProvider = sendEndpointProvider;
        }

        public async Task<Unit> Handle(BookCommand request, CancellationToken cancellationToken)
        {
            var sendEndpoint = await sendEndpointProvider.GetSendEndpoint(new Uri("exchange:booking-orders-listener"));
            
            await sendEndpoint.Send(new ProcessBookingOrder(
                new FacilityId(request.FacilityId),    
                new CustomerId(request.CustomerId),
                request.BookedRecords.Select(r => new Accessibility.Application.Bookings.IntegrationEvents.Events.BookedRecord(
                    new EmployeeId(r.EmployeeId),
                    new OfferId(r.OfferId),
                    r.Date)).ToList()
            ));

            return Unit.Value;
        }
    }
}