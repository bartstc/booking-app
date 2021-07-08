using System.Threading;
using System.Threading.Tasks;
using Core.Commands;
using Core.Domain.Repositories;
using MediatR;

namespace Enterprise.Facilities.Commands.ConfirmBooking
{
    public class ConfirmBookingCommandHandler : ICommandHandler<ConfirmBookingCommand>
    {
        private readonly IRepository<Facility> repository;

        public ConfirmBookingCommandHandler(IRepository<Facility> repository)
        {
            this.repository = repository;
        }

        public async Task<Unit> Handle(ConfirmBookingCommand request, CancellationToken cancellationToken)
        {
            var facility = await repository.FindAsync(request.FacilityId, cancellationToken);

            if (facility == null)
            {
                facility = Facility.Initialize(request.FacilityId);
            }

            facility.ConfirmBooking(request.Offers, request.CustomerId);

            repository.Store(facility, cancellationToken);

            return Unit.Value;
        }
    }
}
