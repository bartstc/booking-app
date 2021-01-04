using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Booking.Application.Bookings.EventBus.ProcessingBookingOrder;
using Booking.Domain.Bookings;
using Booking.Domain.Bookings.BookedRecords;
using Booking.Domain.SharedKernel;
using MassTransit;
using MediatR;

namespace Booking.Application.Bookings.Book
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
                request.BookedRecords.Select(r => new Booking.Application.Bookings.EventBus.ProcessingBookingOrder.BookedRecord(
                    new EmployeeId(r.EmployeeId),
                    new OfferId(r.OfferId),
                    r.Date)).ToList()
            ));

            return Unit.Value;
        }
    }
}