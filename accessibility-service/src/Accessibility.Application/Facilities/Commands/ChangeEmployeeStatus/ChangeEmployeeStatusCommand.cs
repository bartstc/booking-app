using Accessibility.Domain.SharedKernel;
using MediatR;

namespace Accessibility.Application.Facilities.Commands.ChangeEmployeeStatus
{
    public class ChangeEmployeeStatusCommand : IRequest
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
