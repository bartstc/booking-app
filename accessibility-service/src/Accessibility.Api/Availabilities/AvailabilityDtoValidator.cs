using System;
using Accessibility.Application.Schedules.Commands;
using FluentValidation;

namespace Accessibility.Api.Availabilities
{
    public class AvailabilityDtoValidator : AbstractValidator<AvailabilityDto>
    {
        public AvailabilityDtoValidator()
        {
            RuleFor(r => r.EmployeeId).NotEmpty().WithMessage("At least one availabilitie's employee id is empty.");
            RuleFor(r => r.StartTime).GreaterThan(DateTime.Now).WithMessage("At least one availabilitie's start date must be future date.");
            RuleFor(r => r.EndTime).GreaterThan(r => r.StartTime).WithMessage("At least one availabilitie's end date must be greather than start date.");
            RuleFor(r => r.EmployeeId).NotEmpty().WithMessage("At least one availabilitie's creator id is empty.");
        }
    }
}
