using System;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Bookings.BookingServices
{
    public class BookingServiceData
    {
        public BookingServiceData(EmployeeId employeeId, OfferId offerId, Money price, DateTime date, short durationInMinutes)
        {
            EmployeeId = employeeId;
            OfferId = offerId;
            Price = price;
            Date = date;
            DurationInMinutes = durationInMinutes;
        }

        // public BookingServiceData(BookingServiceId id, EmployeeId employeeId, OfferId offerId, Money price, DateTime date, short durationInMinutes)
        // {
        //     EmployeeId = employeeId;
        //     OfferId = offerId;
        //     Price = price;
        //     Date = date;
        //     DurationInMinutes = durationInMinutes;
        // }

        public EmployeeId EmployeeId { get; }
        public OfferId OfferId { get; }
        public Money Price { get; }
        public DateTime Date { get; }
        public short DurationInMinutes { get; }
    }
}
