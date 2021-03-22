using System;
using System.Collections.Generic;
using System.Linq;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.Bookings.Rules;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Bookings
{
    public class Booking : Entity, IAggregateRoot
    {
        private Booking()
        {
            bookedRecords = new List<BookedRecord>();
        }

        private Booking(CustomerId customerId, FacilityId facilityId, BookingStatus status, List<BookedRecordData> records) : this()
        {
            Id = new BookingId(Guid.NewGuid());
            this.customerId = customerId;
            this.FacilityId = facilityId;
            this.status = status;

            foreach (var service in records)
            {
                var bookedRecord = new BookedRecord(
                    service.EmployeeId,
                    service.OfferId,
                    service.Price,
                    service.Date,
                    service.DurationInMinutes
                );

                bookedRecords.Add(bookedRecord);
                
                if (status == BookingStatus.Booked)
                {
                    AddDomainEvent(new BookedEvent(
                        bookedRecord.Id,
                        customerId,
                        facilityId,
                        service.OfferId
                    ));
                }
            }
        }

        public BookingId Id { get; }
        public FacilityId FacilityId { get; }
        private CustomerId customerId;
        private List<BookedRecord> bookedRecords;
        private BookingStatus status;
        private DateTime requestedDate;
        private DateTime bookedDate;
        
        public bool IsFinished => bookedRecords.All(s => s.IsFinished);

        public static Booking CreateRequested(CustomerId customerId, FacilityId facilityId, List<BookedRecordData> records)
        {
            var booking = new Booking(customerId, facilityId, BookingStatus.Requested, records);
            booking.requestedDate = DateTime.Now;
            return booking;
        }

        public static Booking CreateBooked(CustomerId customerId, FacilityId facilityId, List<BookedRecordData> records)
        {
            var booking = new Booking(customerId, facilityId, BookingStatus.Booked, records);
            booking.bookedDate = DateTime.Now;
            return booking;
        }

        public void SetBooked()
        {
            CheckRule(new BookingOnStatusChangeMustHaveCorrectPreviousStatus(status, BookingStatus.Booked));

            status = BookingStatus.Booked;
            bookedDate = DateTime.Now;
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