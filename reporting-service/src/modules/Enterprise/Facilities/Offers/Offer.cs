using System;

namespace Enterprise.Facilities.Offers
{
    public class Offer
    {
        public Offer(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; set; }
        public long ConfirmedCount { get; internal set; }
        public long CancelledCount { get; internal set; }
    }
}
