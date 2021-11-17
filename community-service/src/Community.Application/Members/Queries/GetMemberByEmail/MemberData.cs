using System;
using Community.Domain.Members.ValueObjects;

namespace Community.Application.Members.Queries.GetMemberByEmail
{
    public class MemberData
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime? BirthDate { get; set; }
        public Address Address { get; set; }
    }
}
