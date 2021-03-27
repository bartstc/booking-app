using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Accessibility.Application.Bookings.IntegrationEvents.Events;
using Accessibility.Application.Facilities;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;
using MassTransit;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.CreateBookingRequest
{
    public class CreateBookingRequestCommandHandler : IRequestHandler<CreateBookingRequestCommand>
    {
        private readonly IOfferRepository offerRepository;
        private readonly IBookingRepository bookingRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly ISendEndpointProvider sendEndpointProvider;

        public CreateBookingRequestCommandHandler(
            IOfferRepository offerRepository,
            IBookingRepository bookingRepository,
            IUnitOfWork unitOfWork,
            ISendEndpointProvider sendEndpointProvider)
        {
            this.offerRepository = offerRepository;
            this.bookingRepository = bookingRepository;
            this.unitOfWork = unitOfWork;
            this.sendEndpointProvider = sendEndpointProvider;
        }

        public async Task<Unit> Handle(CreateBookingRequestCommand request, CancellationToken cancellationToken)
        {
            var customerId = new CustomerId(request.CustomerId);
            var facilityId = new FacilityId(request.FacilityId);
            var offerIds = request.BookedRecords.Select(r => new OfferId(r.OfferId));
            var offers = await offerRepository.GetByIdsAsync(offerIds);

            var bookedRecords = MappBookedRecords(request, offers);

            var booking = Booking.CreateRequested(
                customerId,
                facilityId,
                bookedRecords
            );

            await bookingRepository.AddAsync(booking);
            await unitOfWork.CommitAsync();

            var sendEndpoint = await sendEndpointProvider.GetSendEndpoint(new Uri($"exchange:{request.EventBusExchanges[EventBusExchange.BookingRequests]}"));

            await sendEndpoint.Send(new BookingRequested(
                facilityId,
                booking.Id)
            );

            return Unit.Value;
        }

        private List<BookedRecordData> MappBookedRecords(CreateBookingRequestCommand request, IEnumerable<Offer> offers)
        {
            var bookedRecords = new List<BookedRecordData>();

            foreach (var record in request.BookedRecords)
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