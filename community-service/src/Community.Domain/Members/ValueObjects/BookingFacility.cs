using System;
using System.Collections.Generic;
using Core.Domain;

namespace Community.Domain.Members.ValueObjects
{
    public class BookingFacility : ValueObject
    {
        public BookingFacility(string name, string address, Guid facilityId)
        {
            Name = name;
            Address = address;
            this.facilityId = facilityId;
        }

        public string Name { get; }
        public string Address { get; }
        public Guid facilityId { get; }
        
        protected override IEnumerable<object> GetEqualityComponents()
        {
            throw new NotImplementedException();
        }
    }
}
