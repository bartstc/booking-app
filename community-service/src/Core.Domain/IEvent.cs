using System;
using MediatR;

namespace Core.Domain
{
    public interface IEvent : INotification
    {
        DateTime OcucuredOn { get; }
    }
}
