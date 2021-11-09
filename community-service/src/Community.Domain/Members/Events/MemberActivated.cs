using System;
using System.Text.Json.Serialization;
using Core.Domain;

namespace Community.Domain.Members.Events
{
    public class MemberActivated : EventBase
    {
        [JsonConstructor]
        public MemberActivated(Guid id, string email)
        {
            Id = id;
            Email = email;
        }

        public Guid Id { get; }
        public string Email { get; }
    }
}
