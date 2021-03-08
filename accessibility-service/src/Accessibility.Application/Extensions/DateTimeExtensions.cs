using System;

namespace Accessibility.Application.Extensions
{
    public static class DateTimeExtensions
    {
        public static DateTime Trim(this DateTime date, long roundTicks) =>
            new DateTime(date.Ticks - date.Ticks % roundTicks, date.Kind);
    }
}
