using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.SeedWork;
using MediatR;

namespace Accessibility.Application.Facilities.Commands.ChangeOfferStatus
{
    public class ChangeOfferStatusCommandHandler : IRequestHandler<ChangeOfferStatusCommand>
    {
        private readonly IOfferRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public ChangeOfferStatusCommandHandler(IOfferRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(ChangeOfferStatusCommand request, CancellationToken cancellationToken)
        {
            var offer = await repository.GetByIdAsync(request.OfferId);

            if (offer != null)
            {
                offer.Status = request.Status;
                await unitOfWork.CommitAsync();
            }
            
            return Unit.Value;
        }
    }
}
