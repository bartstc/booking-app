using System;
using MediatR;

namespace Core.Domain
{
    public interface IDomainEvent : INotification
    {
         DateTime OccuredOn { get; }
    }
}