using System;
using System.Collections.Generic;
using Accessibility.Application.Bookings;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.CreateBookingOrder
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