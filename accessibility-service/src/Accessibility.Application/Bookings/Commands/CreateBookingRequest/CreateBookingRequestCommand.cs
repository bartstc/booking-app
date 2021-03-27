using System;
using System.Collections.Generic;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.CreateBookingRequest
{
    public class CreateBookingRequestCommand : IRequest
    {
        public CreateBookingRequestCommand(Guid customerId, Guid facilityId, List<BookedRecordDto> bookedRecords, Dictionary<EventBusExchange, string> eventBusExchanges)
        {
            CustomerId = customerId;
            FacilityId = facilityId;
            BookedRecords = bookedRecords;
            EventBusExchanges = eventBusExchanges;
        }

        public Guid CustomerId { get; }
        public Guid FacilityId { get; }
        public List<BookedRecordDto> BookedRecords { get; }
        public Dictionary<EventBusExchange, string> EventBusExchanges { get; }
    }
}