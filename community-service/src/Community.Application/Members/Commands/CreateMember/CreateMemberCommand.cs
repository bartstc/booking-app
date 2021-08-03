using System;
using Community.Domain.Members.ValueObjects;
using Core.Commands;

namespace Community.Application.Members.Commands.CreateMember
{
    public record CreateMemberCommand(
        string FullName,
        string Email,
        string Phone,
        DateTime? BirthDate,
        Address Address
    ) : ICommand;
}
