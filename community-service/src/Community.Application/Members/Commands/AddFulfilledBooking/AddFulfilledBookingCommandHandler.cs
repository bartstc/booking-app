using System.Threading;
using System.Threading.Tasks;
using Community.Domain.Members;
using Core.Commands;
using Core.Domain.Repositories;
using MediatR;

namespace Community.Application.Members.Commands.AddFulfilledBooking
{
    public class AddFulfilledBookingCommandHandler : ICommandHandler<AddFulfilledBookingCommand>
    {
        private readonly IRepository<Member> repository;

        public AddFulfilledBookingCommandHandler(IRepository<Member> repository)
        {
            this.repository = repository;
        }

        public async Task<Unit> Handle(AddFulfilledBookingCommand request, CancellationToken cancellationToken)
        {
            var member = await repository.FindAsync(request.MemberId, cancellationToken);

            member.AddFulfilledBooking(request.Offer, request.Facility, request.Employee, request.Date, request.Duration, request.BookedRecordId);

            return Unit.Value;
        }
    }
}
