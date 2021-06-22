using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.ProcessBookingRequest
{
    public class BookingConfirmedNotificationHandler : INotificationHandler<BookingConfirmedNotification>
    {
        public Task Handle(BookingConfirmedNotification notification, CancellationToken cancellationToken)
        {
            // TODO: reporting, email ...

            return Task.CompletedTask;
        }
    }
}
