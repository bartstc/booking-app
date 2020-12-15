using System;
using MediatR;

namespace Accessibility.Domain.SeedWork
{
    public interface IDomainEvent : INotification
    {
         DateTime OccuredOn { get; }
    }
}