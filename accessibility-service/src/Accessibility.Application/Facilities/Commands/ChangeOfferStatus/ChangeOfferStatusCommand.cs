using Accessibility.Domain.SharedKernel;
using Core.Commands;

namespace Accessibility.Application.Facilities.Commands.ChangeOfferStatus
{
    public class ChangeOfferStatusCommand : ICommand
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
