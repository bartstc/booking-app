using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.SharedKernel;
using MediatR;
using Core.Domain.UnitOfWork;
using Core.Commands;

namespace Accessibility.Application.Schedules.Commands.CreateSchedule
{
    public class CreateScheduleCommandHandler : ICommandHandler<CreateScheduleCommand>
    {
        private readonly IScheduleRepository repository;
        private readonly ISchedulePeriodOfTimeChecker schedulePeriodOfTimeChecker;
        private readonly IUnitOfWork unitOfWork;

        public CreateScheduleCommandHandler(IScheduleRepository repository, ISchedulePeriodOfTimeChecker schedulePeriodOfTimeChecker, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.schedulePeriodOfTimeChecker = schedulePeriodOfTimeChecker;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(CreateScheduleCommand request, CancellationToken cancellationToken)
        {
            var schedule = new Schedule(
                schedulePeriodOfTimeChecker,
                new FacilityId(request.FacilityId),
                request.Name,
                request.StartDate,
                request.EndDate,
                new EmployeeId(request.CreatorId)
            );

            await repository.AddAsync(schedule);

            return Unit.Value;
        }
    }
}
