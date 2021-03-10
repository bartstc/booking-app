using System;

namespace Accessibility.Application.Extensions
{
    public static class DateTimeExtensions
    {
        public static DateTime Trim(this DateTime date, long roundTicks) =>
            new DateTime(date.Ticks - date.Ticks % roundTicks, date.Kind);

        public static bool HasCommonPeriod(this (DateTime start, DateTime end) period1, (DateTime start, DateTime end) period2) =>
            period1.start < period2.end && period2.start < period1.end;
    }
}
