using System;
using System.Collections.Generic;
using Core.Commands;

namespace Accessibility.Application.Bookings.Commands.CreateBookingRequest
{
    public class CreateBookingRequestCommand : ICommand
    {
        public CreateBookingRequestCommand(Guid customerId, Guid facilityId, List<BookedRecordDto> bookedRecords, bool isMadeManually, Dictionary<EventBusExchange, string> eventBusExchanges)
        {
            CustomerId = customerId;
            FacilityId = facilityId;
            BookedRecords = bookedRecords;
            IsMadeManually = isMadeManually;
            EventBusExchanges = eventBusExchanges;
        }

        public Guid CustomerId { get; }
        public Guid FacilityId { get; }
        public List<BookedRecordDto> BookedRecords { get; }
        public bool IsMadeManually { get; }
        public Dictionary<EventBusExchange, string> EventBusExchanges { get; }
    }
}