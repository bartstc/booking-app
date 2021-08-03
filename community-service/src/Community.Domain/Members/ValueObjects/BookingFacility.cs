using System;
using System.Collections.Generic;
using Core.Domain;

namespace Community.Domain.Members.ValueObjects
{
    public class BookingFacility : ValueObject
    {
        public BookingFacility(string name, string address, Guid id)
        {
            Name = name;
            Address = address;
            Id = id;
        }

        public string Name { get; }
        public string Address { get; }
        public Guid Id { get; }
        
        protected override IEnumerable<object> GetEqualityComponents()
        {
            throw new NotImplementedException();
        }
    }
}
