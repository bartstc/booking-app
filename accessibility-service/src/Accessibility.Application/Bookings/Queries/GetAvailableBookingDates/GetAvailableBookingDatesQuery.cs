using System;
using System.Collections.Generic;
using MediatR;

namespace Accessibility.Application.Bookings.Queries.GetAvailableBookingDates
{
    public class GetAvailableBookingDatesQuery : IRequest<IEnumerable<AvailableBookingDateDto>>
    {
        public GetAvailableBookingDatesQuery(Guid facilityId, Guid offerId, DateTime dateFrom, DateTime dateTo, BookingRulesData bookingRules)
        {
            FacilityId = facilityId;
            OfferId = offerId;
            DateFrom = dateFrom;
            DateTo = dateTo;
            BookingRules = bookingRules;
        }

        public Guid FacilityId { get; }
        public Guid OfferId { get; }
        public DateTime DateFrom { get; }
        public DateTime DateTo { get; }
        public BookingRulesData BookingRules { get; }
    }
}
