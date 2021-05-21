using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.ProcessBookingRequest
{
    public class BookingConfirmedNotificationHandler : INotificationHandler<BookingConfirmedNotification>
    {
        public async Task Handle(BookingConfirmedNotification notification, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
