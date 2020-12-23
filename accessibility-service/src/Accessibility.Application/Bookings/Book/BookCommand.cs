using System;
using System.Collections.Generic;
using MediatR;

namespace Accessibility.Application.Bookings.Book
{
    public class BookCommand : IRequest
    {
        public BookCommand(Guid customerId, Guid facilityId, List<BookedRecordDto> bookingServices)
        {
            CustomerId = customerId;
            FacilityId = facilityId;
            BookingServices = bookingServices;
        }

        public Guid CustomerId { get; }
        public Guid FacilityId { get; }
        public List<BookedRecordDto> BookingServices { get; }
    }
}