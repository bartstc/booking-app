using System;
using Core.Commands;

namespace Community.Application.Members.Commands.CreateMember
{
    public record CreateMemberCommand(
        string FullName,
        string Email,
        string Phone,
        DateTime? BirthDate
    ) : ICommand;
}
