using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.CreateBookingOrder
{
    public class BookedNotificationHandler : INotificationHandler<BookedNotification>
    {
        public Task Handle(BookedNotification notification, CancellationToken cancellationToken)
        {
            // TODO: send email, reporting ...

            return Task.CompletedTask;
        }
    }
}