using System;
using System.Collections.Generic;
using MediatR;

namespace Booking.Application.Bookings.Book
{
    public class BookCommand : IRequest
    {
        public BookCommand(Guid customerId, Guid facilityId, List<BookedRecordDto> bookedRecords)
        {
            CustomerId = customerId;
            FacilityId = facilityId;
            BookedRecords = bookedRecords;
        }

        public Guid CustomerId { get; }
        public Guid FacilityId { get; }
        public List<BookedRecordDto> BookedRecords { get; }
    }
}