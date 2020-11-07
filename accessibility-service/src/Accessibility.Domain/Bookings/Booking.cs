using System;
using Accessibility.Domain.Bookings.Rules;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Bookings
{
    public class Booking : Entity, IAggregateRoot
    {
        public Booking(EmployeeId employeeId, CustomerId customerId, OfferId offerId, Money price, DateTime date)
        {
            CheckRule(new DateMustBeFromTheFutureRule(date));

            Id = new BookingId(Guid.NewGuid());
            this.EmployeeId = employeeId;
            this.CustomerId = customerId;
            this.OfferId = offerId;
            this.Price = price;
            this.Status = BookingStatus.Booked;
            this.Date = date;
            this.CreationDate = DateTime.Now;

            AddDomainEvent(new BookingCreatedEvent(offerId, customerId, date));
        }
        
        public BookingId Id { get; }
        public EmployeeId EmployeeId { get; }
        public CustomerId CustomerId { get; }
        public OfferId OfferId { get; }
        public Money Price { get; }
        public BookingStatus Status { get; }
        public DateTime Date { get; }
        public DateTime CreationDate { get; }
        public DateTime? ChangeDate { get; }
    }
}