using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.Schedules.Availabilities;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;
using MediatR;

namespace Accessibility.Application.Schedules.Commands.CreateSchedule
{
    public class CreateScheduleCommandHandler : IRequestHandler<CreateScheduleCommand, Guid>
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

        public async Task<Guid> Handle(CreateScheduleCommand request, CancellationToken cancellationToken)
        {
            var schedule = new Schedule(
                schedulePeriodOfTimeChecker,
                new FacilityId(request.FacilityId),
                request.Name,
                request.StartDate,
                request.EndDate,
                request.Availabilities.Select(a => new AvailabilityData(
                    new EmployeeId(a.EmployeeId),
                    a.StartTime,
                    a.EndTime,
                    new EmployeeId(a.CreatorId)
                )).ToList(),
                new EmployeeId(request.CreatorId)
            );

            await repository.AddAsync(schedule);
            await unitOfWork.CommitAsync(cancellationToken);

            return schedule.Id.Value;
        }
    }
}
