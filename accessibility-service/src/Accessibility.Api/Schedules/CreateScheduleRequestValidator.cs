using System;
using FluentValidation;

namespace Accessibility.Api.Schedules
{
    public class CreateScheduleRequestValidator : AbstractValidator<CreateScheduleRequest>
    {
        public CreateScheduleRequestValidator()
        {
            RuleFor(r => r.Name).NotEmpty().WithMessage("Schedule name is empty.");
            RuleFor(r => r.StartDate).GreaterThan(DateTime.Now).WithMessage("Start date is from the past.");
            RuleFor(r => r.EndDate).GreaterThan(r => r.StartDate).WithMessage("End date is earlier or equal than start date.");
            RuleFor(r => r.CreatorId).NotEmpty().WithMessage("Creators id is empty.");
        }
    }
}
