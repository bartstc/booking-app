using System;

namespace Enterprise.Facilities
{
    public class OfferConfirmed
    {
        public OfferConfirmed(Guid offerId, Guid employeeId)
        {
            OfferId = offerId;
            EmployeeId = employeeId;
        }

        public Guid OfferId { get; }
        public Guid EmployeeId { get; }
    }
}
