using System.Collections.Generic;
using Core.Domain;

namespace Community.Domain.Members.ValueObjects
{
    public class Address : ValueObject
    {
        public Address(string city, string postCode, string street)
        {
            City = city;
            PostCode = postCode;
            Street = street;
        }

        public string City { get; }
        public string PostCode { get; }
        public string Street { get; }

        protected override IEnumerable<object> GetEqualityComponents() =>
            new List<object> { City, PostCode, Street };
    }
}
