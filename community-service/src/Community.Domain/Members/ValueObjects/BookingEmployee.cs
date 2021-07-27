using System;
using System.Collections.Generic;
using Core.Domain;

namespace Community.Domain.Members.ValueObjects
{
    public class BookingEmployee : ValueObject
    {
        public BookingEmployee(string name, Guid id)
        {
            Name = name;
            Id = id;
        }

        public string Name { get; }
        public Guid Id { get; }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            throw new NotImplementedException();
        }
    }
}
