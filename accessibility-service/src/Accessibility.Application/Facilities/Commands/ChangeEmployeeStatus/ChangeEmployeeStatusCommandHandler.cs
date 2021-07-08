using System.Threading;
using System.Threading.Tasks;
using Core.Commands;
using Core.Domain.UnitOfWork;
using MediatR;

namespace Accessibility.Application.Facilities.Commands.ChangeEmployeeStatus
{
    public class ChangeEmployeeStatusCommandHandler : ICommandHandler<ChangeEmployeeStatusCommand>
    {
        private readonly IEmployeeRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public ChangeEmployeeStatusCommandHandler(IEmployeeRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(ChangeEmployeeStatusCommand request, CancellationToken cancellationToken)
        {
            var employee = await repository.GetByIdAsync(request.EmployeeId);

            if (employee != null)
            {
                employee.Status = request.Status;
            }

            return Unit.Value;
        }
    }
}
