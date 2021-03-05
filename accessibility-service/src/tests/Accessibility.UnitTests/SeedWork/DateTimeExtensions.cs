using System;

namespace Booking.UnitTests.SeedWork
{
    public static class DateTimeExtensions
    {
        public static DateTime ClearMiliseconds(this DateTime date) =>
            new DateTime(date.Ticks - (date.Ticks % TimeSpan.TicksPerSecond), date.Kind) ;
    }
}