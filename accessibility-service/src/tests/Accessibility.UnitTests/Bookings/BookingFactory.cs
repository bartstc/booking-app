using System;
using System.Collections.Generic;
using System.Linq;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.UnitTests.Bookings
{
    internal static class BookingFactory
    {
        internal static Booking CreateBooked(DateTime date, short duration) =>
            CreateBooked(new List<(DateTime, short)>{
                (date, duration)
            });
        
        internal static Booking CreateBooked(List<(DateTime date, short duration)> services) =>
            Booking.CreateBooked(
                new CustomerId(Guid.NewGuid()),
                new FacilityId(Guid.NewGuid()),
                services.Select(s => new BookedRecordData(
                    new EmployeeId(Guid.NewGuid()),
                        new OfferId(Guid.NewGuid()),
                        Money.Of(50, "PLN"),
                        s.date,
                        s.duration
                )).ToList()
            );
    }
}
