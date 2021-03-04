using System;
using System.Collections.Generic;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Application.Bookings.IntegrationEvents.Events
{
    public class ProcessBookingOrder
    {
        public ProcessBookingOrder(FacilityId facilityId, CustomerId customerId, List<BookedRecord> bookedRecords)
        {
            FacilityId = facilityId;
            CustomerId = customerId;
            BookedRecords = bookedRecords;
        }

        public FacilityId FacilityId { get; }
        public CustomerId CustomerId { get; }
        public List<BookedRecord> BookedRecords { get; }
    }

    public class BookedRecord
    {
        public BookedRecord(EmployeeId employeeId, OfferId offerId, DateTime date)
        {
            EmployeeId = employeeId;
            OfferId = offerId;
            Date = date;
        }

        public EmployeeId EmployeeId { get; }
        public OfferId OfferId { get; }
        public DateTime Date { get; }
    }
}
