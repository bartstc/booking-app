using Accessibility.Domain.SharedKernel;
using Core.Commands;

namespace Accessibility.Application.Facilities.Commands.ChangeEmployeeStatus
{
    public class ChangeEmployeeStatusCommand : ICommand
    {
        public ChangeEmployeeStatusCommand(EmployeeId employeeId, EntityStatus status)
        {
            EmployeeId = employeeId;
            Status = status;
        }

        public EmployeeId EmployeeId { get; }
        public EntityStatus Status { get; }
    }
}
