using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;
using MediatR;

namespace Accessibility.Application.Facilities.Commands.CreateOffer
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
            var offer = new Offer(
                new OfferId(request.Id),
                new FacilityId(request.FacilityId),
                request.Name,
                request.Price,
                request.Currency,
                request.Duration
            );

            await repository.AddAsync(offer);
            await unitOfWork.CommitAsync();

            return Unit.Value;
        }
    }
}
