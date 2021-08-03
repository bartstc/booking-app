using System.Threading;
using System.Threading.Tasks;
using Community.Domain.Members;
using Community.Domain.Members.ValueObjects;
using Core.Commands;
using Core.Domain.Repositories;
using MediatR;

namespace Community.Application.Members.Commands.AddCompletedBookings
{
    public class AddCompletedBookingsCommandHandler : ICommandHandler<AddCompletedBookingsCommand>
    {
        private readonly IRepository<Member> memberRepository;

        public AddCompletedBookingsCommandHandler(IRepository<Member> memberRepository)
        {
            this.memberRepository = memberRepository;
        }

        public async Task<Unit> Handle(AddCompletedBookingsCommand request, CancellationToken cancellationToken)
        {
            var member = await memberRepository.FindAsync(request.MemberId, cancellationToken);

            foreach (var booking in request.Bookings)
            {
                var offer = new BookingOffer(booking.OfferName, booking.OfferId);
                var employee = new BookingEmployee(booking.EmployeeName, booking.EmployeeId);

                switch (booking.Status)
                {
                    case BookingStatus.Fulfilled:
                        member.AddFulfilledBooking(offer, null, employee, booking.Date, booking.Duration, booking.BookedRecordId);
                        break;
                    case BookingStatus.Canceled:
                        member.AddCanceledBooking(offer, null, employee, booking.Date, booking.Duration, booking.BookedRecordId);
                        break;
                }
            }

            memberRepository.Store(member, cancellationToken);

            return Unit.Value;
        }
    }
}
