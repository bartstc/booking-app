using System.Reflection;
using Accessibility.Application.Bookings.CreateBooking;

namespace Accessibility.Infrastructure.Processing
{
    public static class Assemblies
    {
        public static Assembly Application = typeof(BookingCreatedNotification).Assembly;
    }
}
