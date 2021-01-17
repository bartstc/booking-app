using System.Threading;
using System.Threading.Tasks;
using Booking.Domain.SeedWork;
using MediatR;

namespace Booking.Application.Facilities.Commands.CreateOffer
{
    public class CreateOfferCommandHandler : IRequestHandler<CreateOfferCommand>
    {
        private readonly IOfferRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public CreateOfferCommandHandler(IOfferRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(CreateOfferCommand request, CancellationToken cancellationToken)
        {
            await repository.AddAsync(request.Offer);
            await unitOfWork.CommitAsync();

            return Unit.Value;
        }
    }
}
