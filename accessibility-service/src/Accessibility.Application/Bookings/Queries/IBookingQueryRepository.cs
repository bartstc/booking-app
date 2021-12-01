using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Accessibility.Application.Bookings.Queries.GetAvailableBookingTerms;
using Accessibility.Application.Bookings.Queries.GetBookedRecordsOfFacility;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.SharedKernel;
using Core.Queries;

namespace Accessibility.Application.Bookings.Queries
{
    public interface IBookingQueryRepository
    {
        Task<QueryCollectionResult<BookedRecordOfFacilityDto>> GetBookedRecords(Guid facilityId, GetBookedRecordsOfFacilityQueryParams @params);
        Task<IEnumerable<BookedTerm>> GetBookedTerms(Guid facilityId, DateTime dateFrom, DateTime dateTo);
        Task<int?> GetBookingStatus(BookingId id, FacilityId facilityId);
    }
}
