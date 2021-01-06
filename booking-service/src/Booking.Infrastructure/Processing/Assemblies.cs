using System.Reflection;
using Booking.Application.Bookings.Commands.Book;

namespace Booking.Infrastructure.Processing
{
    public static class Assemblies
    {
        public static Assembly Application = typeof(BookedNotification).Assembly;
    }
}
