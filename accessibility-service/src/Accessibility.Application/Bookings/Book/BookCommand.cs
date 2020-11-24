using System;
using System.Collections.Generic;
using MediatR;

namespace Accessibility.Application.Bookings.Book
{
    public class BookCommand : IRequest<BookingIdDto>
    {
        public BookCommand(Guid customerId, Guid facilityId, List<BookingServiceDto> bookingServices)
        {
            CustomerId = customerId;
            FacilityId = facilityId;
            BookingServices = bookingServices;
        }

        public Guid CustomerId { get; }
        public Guid FacilityId { get; }
        public List<BookingServiceDto> BookingServices { get; }
    }
}