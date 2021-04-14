using Accessibility.Domain.SharedKernel;
using MediatR;

namespace Accessibility.Application.Facilities.Commands.ChangeOfferStatus
{
    public class ChangeOfferStatusCommand : IRequest
    {
        public ChangeOfferStatusCommand(OfferId offerId, EntityStatus status)
        {
            OfferId = offerId;
            Status = status;
        }

        public OfferId OfferId { get; }
        public EntityStatus Status { get; }
    }
}
