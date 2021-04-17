using System;

namespace Accessibility.Application.Facilities.IntegrationEvents.Events
{
    public interface EmployeeDeactivated
    {
        Guid EmployeeId { get; }
    }
}
