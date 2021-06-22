using System;
using System.Collections.Generic;
using Xunit;
using Accessibility.UnitTests.SeedWork;
using System.Linq;
using Accessibility.Domain.BookingServices.Rules;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.Bookings.BookedRecords.Rules;
using Accessibility.Domain.Bookings.Events;
using Core.Domain;

namespace Accessibility.UnitTests.Bookings
{
    public class BookingTests : TestBase
    {
        [Theory]
        [MemberData(nameof(DatesNotFromTheFuture))]
        public void CreateBooked_ServiceDateNotFromTheFuture_BreaksDateMustBeFromTheFutureRule(DateTime date)
        {
            Func<Accessibility.Domain.Bookings.Booking> act = () => BookingFactory.CreateBooked(date, 60);
            
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
        public void ChangeRecordStatus_FinishedAllBookedRecords_IsFinished(BookedRecordStatus serviceStatus)
        {
            var booking = BookingFactory.CreateBooked(DateTime.Now.AddDays(1), 60);
            var serviceId = booking.DomainEvents.OfType<BookedEvent>().Single().BookedRecordId;

            booking.ChangeRecordStatus(serviceId, serviceStatus);

            Assert.True(booking.IsFinished);
            AssertDomainEventPublished<BookingFinishedEvent>(booking);
        }

        [Theory]
        [MemberData(nameof(UnfinishedBookingServiceStatuses))]
        public void ChangeRecordStatus_NotAllBookedRecordsFinished_IsNotFinished(BookedRecordStatus serviceStatus)
        {
            var booking = BookingFactory.CreateBooked(new List<(DateTime, short)> {
                (DateTime.Now.AddDays(1), 60),
                (DateTime.Now.AddDays(2), 60)
            });
            var serviceId = booking.DomainEvents.OfType<BookedEvent>().First().BookedRecordId;

            booking.ChangeRecordStatus(serviceId, serviceStatus);

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
        public void ChangeRecordStatus_BookedRecordIsFinished_BreaksBookingServiceToBeChangedMustBeUnfinishedRule()
        {
            var booking = BookingFactory.CreateBooked(new List<(DateTime, short)> {
                (DateTime.Now.AddDays(1), 60),
                (DateTime.Now.AddDays(2), 60)
            });
            var serviceId = booking.DomainEvents.OfType<BookedEvent>().First().BookedRecordId;
            booking.ChangeRecordStatus(serviceId, BookedRecordStatus.Fulfilled);

            Action act = () => booking.ChangeRecordStatus(serviceId, BookedRecordStatus.Canceled);
            
            AssertBusinessRuleBroke<BookedRecordToBeChangedMustBeUnfinishedRule>(act);
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
            new object[] { BookedRecordStatus.Booked }
        };

        public static IEnumerable<object[]> FinishedBookingServiceStatuses = new List<object[]>
        {
            new object[] { BookedRecordStatus.Fulfilled },
            new object[] { BookedRecordStatus.Canceled },
            new object[] { BookedRecordStatus.NotRealized }
        };
    }
}