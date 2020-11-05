using System;
using System.Collections.Generic;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;
using Xunit;
using Accessibility.Domain.Bookings.Rules;
using Accessibility.UnitTests.SeedWork;

namespace Accessibility.UnitTests
{
    public class BookingTests
    {
        [Theory]
        [MemberData(nameof(DatesNotFromTheFuture))]
        public void Create_DateNotFromTheFuture_BreaksDateMustBeFromTheFutureRule(DateTime date)
        {
            Func<Booking> act = () => new Booking(
                new EmployeeId(Guid.NewGuid()),
                new CustomerId(Guid.NewGuid()),
                new OfferId(Guid.NewGuid()),
                Money.Of(50, "PLN"),
                date
            );
            
            var result = Assert.Throws<BusinessRuleValidationException>(act);
            Assert.IsType<DateMustBeFromTheFutureRule>(result.Rule);
        }

        [Theory]
        [MemberData(nameof(DatesFromTheFuture))]
        public void Create_DateFromTheFuture_ReturnsBookingWithBookedStatusAndCreationDate(DateTime date)
        {
            var booking = new Booking(
                new EmployeeId(Guid.NewGuid()),
                new CustomerId(Guid.NewGuid()),
                new OfferId(Guid.NewGuid()),
                Money.Of(50, "PLN"),
                date
            );
            var creationDate = new DateTime(booking.CreationDate.Ticks - (booking.CreationDate.Ticks % TimeSpan.TicksPerSecond), booking.CreationDate.Kind);
            var now = new DateTime(DateTime.Now.Ticks - (DateTime.Now.Ticks % TimeSpan.TicksPerSecond), DateTime.Now.Kind);

            Assert.Equal(BookingStatus.Booked, booking.Status);
            Assert.Equal(DateTime.Now.ClearMiliseconds(), booking.CreationDate.ClearMiliseconds());
            Assert.Null(booking.ChangeDate);
        }

        public static IEnumerable<object[]> DatesNotFromTheFuture = new List<object[]>
        {
            new object[] { DateTime.Now.AddDays(-1) },
            new object[] { DateTime.Now.AddYears(-1) },
            new object[] { DateTime.Now }
        };

        public static IEnumerable<object[]> DatesFromTheFuture = new List<object[]>
        {
            new object[] { DateTime.Now.AddDays(4) },
            new object[] { DateTime.Now.AddMonths(5) },
            new object[] { DateTime.Now.AddYears(1) }
        };
    }
}