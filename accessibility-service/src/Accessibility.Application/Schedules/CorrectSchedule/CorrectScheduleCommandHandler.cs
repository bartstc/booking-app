using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;
using MediatR;

namespace Accessibility.Application.Schedules.CorrectSchedule
{
    public class CorrectScheduleCommandHandler : IRequestHandler<CorrectScheduleCommand>
    {
        private readonly IScheduleRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public CorrectScheduleCommandHandler(IScheduleRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(CorrectScheduleCommand request, CancellationToken cancellationToken)
        {
            var schedule = await repository.GetByIdAsync(new ScheduleId(request.ScheduleId));

            schedule.CreateCorrection(new Domain.Schedules.Availabilities.AvailabilityData(
                new EmployeeId(request.EmployeeId),
                request.StartTime,
                request.EndTime,
                new EmployeeId(request.CreatorId)
            ));

            await unitOfWork.CommitAsync();

            return Unit.Value;
        }
    }
}
