using System;
using System.Collections.Generic;
using System.Linq;
using Accessibility.Domain.Bookings.BookingServices;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings
{
    public class Booking : Entity, IAggregateRoot
    {
        private Booking()
        {
            bookingServices = new List<BookingService>();
        }

        private Booking(CustomerId customerId, FacilityId facilityId, List<BookingServiceData> services) : this()
        {
            Id = new BookingId(Guid.NewGuid());
            this.customerId = customerId;
            this.facilityId = facilityId;
            this.creationDate = DateTime.Now;
            this.Status = BookingStatus.Booked;

            foreach (var service in services)
            {
                var bookingService = new BookingService(
                    service.EmployeeId,
                    service.OfferId,
                    service.Price,
                    service.Date,
                    service.DurationInMinutes
                );

                bookingServices.Add(bookingService);
                
                AddDomainEvent(new BookedEvent(
                    bookingService.Id,
                    customerId,
                    facilityId,
                    service.OfferId
                ));
            }
        }

        public BookingId Id { get; }
        private CustomerId customerId;
        private FacilityId facilityId;
        private List<BookingService> bookingServices;
        private DateTime creationDate;
        
        public BookingStatus Status { get; }
        public bool IsFinished => bookingServices.All(s => s.IsFinished);

        public static Booking CreateBooked(CustomerId customerId, FacilityId facilityId, List<BookingServiceData> services)
        {
            return new Booking(customerId, facilityId, services);
        }

        public void ChangeServiceStatus(BookingServiceId serviceId, BookingServiceStatus serviceStatus)
        {
            bookingServices
                .First(s => s.Id == serviceId)
                .ChangeStatus(serviceStatus);
            
            if (IsFinished)
                AddDomainEvent(new BookingFinishedEvent(Id));
        }
    }
}