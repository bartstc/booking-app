using System.Reflection;
using Booking.Application.Bookings.Book;

namespace Booking.Infrastructure.Processing
{
    public static class Assemblies
    {
        public static Assembly Application = typeof(BookedNotification).Assembly;
    }
}
