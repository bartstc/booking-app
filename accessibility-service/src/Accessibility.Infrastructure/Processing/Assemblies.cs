using System.Reflection;
using Accessibility.Application.Bookings.Book;

namespace Accessibility.Infrastructure.Processing
{
    public static class Assemblies
    {
        public static Assembly Application = typeof(BookedNotification).Assembly;
    }
}
