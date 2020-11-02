using System;

namespace Accessibility.Domain.SeedWork
{
    public interface IDomainEvent
    {
         DateTime OccuredOn { get; }
    }
}