using System;
using System.Collections.Generic;
using Core.Domain;

namespace Community.Domain.Members.ValueObjects
{
    public class BookingEmployee : ValueObject
    {
        public BookingEmployee(string name, Guid employeeId)
        {
            Name = name;
            EmployeeId = employeeId;
        }

        public string Name { get; }
        public Guid EmployeeId { get; }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            throw new NotImplementedException();
        }
    }
}
