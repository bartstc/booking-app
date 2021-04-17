using System;

namespace Accessibility.Application.Facilities.IntegrationEvents.Events
{
    public interface EmployeeActivated
    {
        Guid EmployeeId { get; }
    }
}
