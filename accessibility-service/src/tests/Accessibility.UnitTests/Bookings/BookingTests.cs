using System;
using System.Collections.Generic;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.SeedWork;
using Xunit;
using Accessibility.UnitTests.SeedWork;
using Accessibility.Domain.BookingServices.Rules;
using Accessibility.Domain.Bookings.BookingServices;
using System.Linq;
using Accessibility.Domain.Bookings.BookingServices.Rules;

namespace Accessibility.UnitTests.Bookings
{
    public class BookingTests : TestBase
    {
        [Theory]
        [MemberData(nameof(DatesNotFromTheFuture))]
        public void CreateBooked_ServiceDateNotFromTheFuture_BreaksDateMustBeFromTheFutureRule(DateTime date)
        {
            Func<Booking> act = () => BookingFactory.CreateBooked(date, 60);
            
            var result = Assert.Throws<BusinessRuleValidationException>(act);
            Assert.IsType<DateMustBeFromTheFutureRule>(result.Rule);
        }

        [Theory]
        [MemberData(nameof(DatesFromTheFuture))]
        public void CreateBooked_DateFromTheFuture_IsSuccess(DateTime date)
        {
            var booking = BookingFactory.CreateBooked(date, 60);

            AssertDomainEventPublished<BookedEvent>(booking);
        }

        [Theory]
        [MemberData(nameof(FinishedBookingServiceStatuses))]
        public void ChangeServiceStatus_FinishedAllServices_IsFinished(BookingServiceStatus serviceStatus)
        {
            var booking = BookingFactory.CreateBooked(DateTime.Now.AddDays(1), 60);
            var serviceId = booking.DomainEvents.OfType<BookedEvent>().Single().BookingServiceId;

            booking.ChangeServiceStatus(serviceId, serviceStatus);

            Assert.True(booking.IsFinished);
            AssertDomainEventPublished<BookingFinishedEvent>(booking);
        }

        [Theory]
        [MemberData(nameof(UnfinishedBookingServiceStatuses))]
        public void ChangeServiceStatus_NotAllServicesFinished_IsNotFinished(BookingServiceStatus serviceStatus)
        {
            var booking = BookingFactory.CreateBooked(new List<(DateTime, short)> {
                (DateTime.Now.AddDays(1), 60),
                (DateTime.Now.AddDays(2), 60)
            });
            var serviceId = booking.DomainEvents.OfType<BookedEvent>().First().BookingServiceId;

            booking.ChangeServiceStatus(serviceId, serviceStatus);

            Assert.False(booking.IsFinished);
        }
        
        // [Fact]
        // [MemberData(nameof(FinishedBookingServiceStatuses))]
        // public void ChangeServiceStatus_BookingIsFinished_BreaksBookingToBeChangedMustBeUnfinishedRule(BookingServiceStatus serviceStatus)
        // {
        //     var booking = BookingFactory.CreateBooked(DateTime.Now.AddDays(1), 60);
        //     var serviceId = booking.DomainEvents.OfType<BookedEvent>().Single().BookingServiceId;
        //     booking.ChangeServiceStatus(serviceId, serviceStatus);

        //     Action act = () => booking.ChangeServiceStatus(serviceId, BookingServiceStatus.Canceled);

        //     AssertBusinessRuleBroke<BookingToBeChangedMustBeUnfinishedRule>(act);
        // }

        [Fact]
        public void ChangeServiceStatus_ServiceIsFinished_BreaksBookingServiceToBeChangedMustBeUnfinishedRule()
        {
            var booking = BookingFactory.CreateBooked(new List<(DateTime, short)> {
                (DateTime.Now.AddDays(1), 60),
                (DateTime.Now.AddDays(2), 60)
            });
            var serviceId = booking.DomainEvents.OfType<BookedEvent>().First().BookingServiceId;
            booking.ChangeServiceStatus(serviceId, BookingServiceStatus.Fulfilled);

            Action act = () => booking.ChangeServiceStatus(serviceId, BookingServiceStatus.Canceled);
            
            AssertBusinessRuleBroke<BookingServiceToBeChangedMustBeUnfinishedRule>(act);
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

        public static IEnumerable<object[]> UnfinishedBookingServiceStatuses = new List<object[]>
        {
            new object[] { BookingServiceStatus.Booked }
        };

        public static IEnumerable<object[]> FinishedBookingServiceStatuses = new List<object[]>
        {
            new object[] { BookingServiceStatus.Fulfilled },
            new object[] { BookingServiceStatus.Canceled }
        };
    }
}