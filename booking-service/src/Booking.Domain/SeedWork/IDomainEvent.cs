using System;
using MediatR;

namespace Booking.Domain.SeedWork
{
    public interface IDomainEvent : INotification
    {
         DateTime OccuredOn { get; }
    }
}