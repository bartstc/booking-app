using System;
using System.Collections.Generic;
using Accessibility.Application.Extensions;
using Xunit;

namespace Accessibility.UnitTests.SharedKernel
{
    public class DateTimeExtensionsTests
    {
        [Theory]
        [MemberData(nameof(periodsExpected))]
        public void HasCommonPeriod_PeriodsGiven_ReturnsExpected(
            (DateTime start, DateTime end) period1,
            (DateTime start, DateTime end) period2,
            bool expedted)
        {
            var result = period1.HasCommonPeriod(period2);

            Assert.Equal(expedted, result);
        }

        public static IEnumerable<object[]> periodsExpected = new List<object[]>
        {
            new object[]
            {
                (
                    DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                (
                    DateTime.ParseExact("2022-05-08 20:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 21:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                false
            },
            new object[]
            {
                (
                    DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                (
                    DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 10:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                false
            },
            new object[]
            {
                (
                    DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                (
                    DateTime.ParseExact("2022-05-08 08:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 09:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                true
            },
            new object[]
            {
                (
                    DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                (
                    DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                true
            },
            new object[]
            {
                (
                    DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                (
                    DateTime.ParseExact("2022-05-08 06:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 07:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                false
            },
            new object[]
            {
                (
                    DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                (
                    DateTime.ParseExact("2022-05-08 06:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 08:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                true
            },
            new object[]
            {
                (
                    DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                (
                    DateTime.ParseExact("2022-05-08 06:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                    DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                ),
                false
            }
        };
    }
}
