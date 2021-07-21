using System;
using Core.Domain;

namespace Community.Domain.Members.Events
{
    public class MemberCreated : IEvent
    {
        public MemberCreated(Guid id, string fullName, string email, string phone, DateTime? birthDate)
        {
            Id = id;
            FullName = fullName;
            Email = email;
            Phone = phone;
            BirthDate = birthDate;
        }

        public Guid Id { get; }
        public string FullName { get; }
        public string Email { get; }
        public string Phone { get; }
        public DateTime? BirthDate { get; }
    }
}
