using System;
using System.Collections.Generic;
using Core.Domain;

namespace Community.Domain.Members.ValueObjects
{
    public class BookingOffer : ValueObject
    {
        public BookingOffer(string name, Guid offerId)
        {
            Name = name;
            OfferId = offerId;
        }

        public string Name { get; }
        public Guid OfferId { get; }
        
        protected override IEnumerable<object> GetEqualityComponents()
        {
            throw new NotImplementedException();
        }
    }
}
