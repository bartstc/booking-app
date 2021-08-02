using System;
using System.Collections.Generic;
using Accessibility.Application.Bookings;

namespace Accessibility.Api.Bookings
{
    public class CreateBookingRequest
    {
        public Guid CustomerId { get; set; }
        public List<BookedRecordDto> BookedRecords { get; set; }
    }
}
