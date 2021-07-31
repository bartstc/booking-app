using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Accessibility.Application.Bookings.Commands.CreateBooking;
using Accessibility.Application.Facilities;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SharedKernel;
using Core.Commands;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.ProcessBookingRequest
{
    public class ProcessBookingRequestCommandHandler : ICommandHandler<ProcessBookingRequestCommand>
    {
        private readonly IBookingRepository bookingRepository;
        private readonly IOfferRepository offerRepository;
        private readonly IBookingPeriodOfTimeChecker bookingPeriodOfTimeChecker;

        public ProcessBookingRequestCommandHandler(
            IBookingRepository bookingRepository,
            IOfferRepository offerRepository,
            IBookingPeriodOfTimeChecker bookingPeriodOfTimeChecker)
        {
            this.bookingRepository = bookingRepository;
            this.offerRepository = offerRepository;
            this.bookingPeriodOfTimeChecker = bookingPeriodOfTimeChecker;
        }

        public async Task<Unit> Handle(ProcessBookingRequestCommand request, CancellationToken cancellationToken)
        {
            var command = request.Command;

            var customerId = command.IsMadeManually ? new CustomerId(command.CustomerId) : null;
            var publicCustomerId = !command.IsMadeManually ? new PublicCustomerId(command.CustomerId) : null;
            var facilityId = new FacilityId(command.FacilityId);
            var offerIds = command.BookedRecords.Select(r => new OfferId(r.OfferId));
            var offers = await offerRepository.GetByIdsAsync(offerIds);

            var bookedRecords = MappBookedRecords(command, offers);
            
            var booking = command.IsMadeManually ?
                    await Booking.CreateBookedManually(
                        customerId,
                        facilityId,
                        bookedRecords,
                        bookingPeriodOfTimeChecker) :
                    await Booking.CreateBooked(
                        publicCustomerId,
                        facilityId,
                        bookedRecords,
                        bookingPeriodOfTimeChecker);

            await bookingRepository.AddAsync(booking);

            return Unit.Value;
        }

        private List<BookedRecordData> MappBookedRecords(CreateBookingCommand command, IEnumerable<Offer> offers)
        {
            var bookedRecords = new List<BookedRecordData>();

            foreach (var record in command.BookedRecords)
            {
                var offerId = new OfferId(record.OfferId);
                var employeeId = new EmployeeId(record.EmployeeId);
                var offer = offers.First(o => o.Id == offerId);

                bookedRecords.Add(new BookedRecordData(
                    employeeId,
                    offerId,
                    Money.Of(offer.Price, offer.Currency),
                    record.Date,
                    offer.Duration
                ));
            }

            return bookedRecords;
        }
    }
}
