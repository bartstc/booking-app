using System;
using System.Collections.Generic;
using System.Linq;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings
{
    public class Booking : Entity, IAggregateRoot
    {
        private Booking()
        {
            bookedRecords = new List<BookedRecord>();
        }

        private Booking(CustomerId customerId, FacilityId facilityId, List<BookedRecordData> records) : this()
        {
            Id = new BookingId(Guid.NewGuid());
            this.customerId = customerId;
            this.facilityId = facilityId;
            this.creationDate = DateTime.Now;
            this.status = BookingStatus.Booked;

            foreach (var service in records)
            {
                var bookingService = new BookedRecord(
                    service.EmployeeId,
                    service.OfferId,
                    service.Price,
                    service.Date,
                    service.DurationInMinutes
                );

                bookedRecords.Add(bookingService);
                
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
        private List<BookedRecord> bookedRecords;
        private BookingStatus status;
        private DateTime creationDate;
        
        public bool IsFinished => bookedRecords.All(s => s.IsFinished);

        public static Booking CreateBooked(CustomerId customerId, FacilityId facilityId, List<BookedRecordData> records)
        {
            return new Booking(customerId, facilityId, records);
        }

        public void ChangeRecordStatus(BookedRecordId serviceId, BookedRecordStatus recordStatus)
        {
            bookedRecords
                .First(s => s.Id == serviceId)
                .ChangeStatus(recordStatus);
            
            if (IsFinished)
            {
                status = BookingStatus.Finished;
                AddDomainEvent(new BookingFinishedEvent(Id));
            }
        }
    }
}