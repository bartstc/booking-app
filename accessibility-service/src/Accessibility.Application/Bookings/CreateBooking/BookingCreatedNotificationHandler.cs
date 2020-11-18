using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Accessibility.Application.Bookings.CreateBooking
{
    public class BookingCreatedNotificationHandler : INotificationHandler<BookingCreatedNotification>
    {
        public Task Handle(BookingCreatedNotification notification, CancellationToken cancellationToken)
        {
            // TODO: send email, reporting ...

            return Task.CompletedTask;
        }
    }
}