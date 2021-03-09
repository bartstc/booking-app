using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Accessibility.Application.Schedules;
using MediatR;
using Accessibility.Application.Extensions;
using Accessibility.Application.Facilities;

namespace Accessibility.Application.Bookings.Queries.GetAvailableBookingTerms
{
    public class GetAvailableBookingTermsQueryHandler : IRequestHandler<GetAvailableBookingTermsQuery, IEnumerable<AvailableBookingTermDto>>
    {
        private readonly IScheduleQueryRepository scheduleRepository;
        private readonly IBookingQueryRepository bookingRepository;
        private readonly IOfferQueryRepository offerRepository;

        public GetAvailableBookingTermsQueryHandler(IScheduleQueryRepository scheduleRepository, IBookingQueryRepository bookingRepository, IOfferQueryRepository offerRepository)
        {
            this.scheduleRepository = scheduleRepository;
            this.bookingRepository = bookingRepository;
            this.offerRepository = offerRepository;
        }

        public async Task<IEnumerable<AvailableBookingTermDto>> Handle(GetAvailableBookingTermsQuery request, CancellationToken cancellationToken)
        {
            var dateFrom = request.DateFrom > DateTime.Now ? request.DateFrom : DateTime.Now;
            var duration = await offerRepository.GetOfferDuration(request.FacilityId, request.OfferId);
            if (duration == 0)
            {
                throw new Exception("Offer not found.");
            }

            var availabilities = await scheduleRepository.GetAllAvailabilities(dateFrom, request.DateTo, request.FacilityId);
            var bookedTerms = await bookingRepository.GetBookedTerms(request.FacilityId, dateFrom, request.DateTo);

            var dateAvailabilities = availabilities.ToLookup(a => a.StartTime.Date).OrderBy(x => x.Key);
            var employeeBookedTerms = bookedTerms.ToLookup(b => b.EmployeeId);

            var minutesChunk = 60 / request.BookingRules.HourChunkCount;
            var dateConst = dateFrom.Trim(TimeSpan.TicksPerHour); // TODO: always date from the future

            var dict = new Dictionary<DateTime, (List<Guid> available, List<UnavailableEmployee> unavailable)>();

            foreach (var availability in availabilities)
            {
                if (availability.EndTime < dateConst)
                    continue;
                
                var date = dateConst;

                while (date.AddMinutes(duration) <= availability.EndTime)
                {
                    var dateEnd = date.AddMinutes(duration);

                    var bookedTerm = employeeBookedTerms[availability.EmployeeId].FirstOrDefault(e => (e.DateFrom >= date && e.DateFrom < dateEnd) || (e.DateTo > date && e.DateTo <= dateEnd));

                    (List<Guid> available, List<UnavailableEmployee> unavailable) tuple;

                    if (!dict.TryGetValue(date, out tuple))
                    {
                        tuple = (new List<Guid>(), new List<UnavailableEmployee>());
                        dict[date] = tuple;
                    }

                    if (bookedTerm == null)
                    {
                        tuple.available.Add(availability.EmployeeId);
                    }
                    else
                    {
                        tuple.unavailable.Add(new UnavailableEmployee(availability.EmployeeId));
                    }

                    date = date.AddMinutes(minutesChunk);
                }
            }

            return dict.Select(d => new AvailableBookingTermDto(d.Key, d.Value.available, d.Value.unavailable)).OrderBy(d => d.Date);
        }
    }
}
