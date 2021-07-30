using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.Bookings.Events;
using Accessibility.Domain.Bookings.Rules;
using Core.Domain;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Bookings
{
    public class Booking : Entity, IAggregateRoot
    {
        private Booking()
        {
            bookedRecords = new List<BookedRecord>();
        }

        private Booking(
            CustomerId customerId,
            PublicCustomerId publicCustomerId,
            FacilityId facilityId,
            BookingStatus status,
            List<BookedRecordData> records,
            bool isMadeManually) : this()
        {
            Id = new BookingId(Guid.NewGuid());
            this.customerId = customerId;
            this.PublicCustomerId = publicCustomerId;
            this.FacilityId = facilityId;
            this.status = status;
            this.IsMadeManually = isMadeManually;

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
        public PublicCustomerId PublicCustomerId { get; }
        private List<BookedRecord> bookedRecords;
        private BookingStatus status;
        public bool IsMadeManually { get; }
        private DateTime requestedDate;
        private DateTime bookedDate;
        
        public bool IsCompleted => bookedRecords.All(s => s.IsCompleted);
        
        public static Booking CreateRequested(
            PublicCustomerId publicCustomerId,
            FacilityId facilityId,
            List<BookedRecordData> records)
        {
            var booking = new Booking(null, publicCustomerId, facilityId, BookingStatus.Requested, records, false);
            booking.requestedDate = DateTime.Now;
            return booking;
        }

        public static Booking CreateRequestedManually(
            CustomerId customerId,
            FacilityId facilityId,
            List<BookedRecordData> records)
        {
            var booking = new Booking(customerId, null, facilityId, BookingStatus.Requested, records, true);
            booking.requestedDate = DateTime.Now;
            return booking;
        }

        public static Booking CreateBooked(CustomerId customerId, FacilityId facilityId, List<BookedRecordData> records)
        {
            var booking = new Booking(customerId, null, facilityId, BookingStatus.Booked, records, true);
            booking.bookedDate = DateTime.Now;
            return booking;
        }

        public async Task SetBooked(IBookingPeriodOfTimeChecker checker)
        {
            CheckRule(new BookingOnStatusChangeMustHaveCorrectPreviousStatusRule(status, BookingStatus.Booked));
            CheckRule(new BookingRequestingCannotExceedTimeoutRule(requestedDate));
            await CheckRuleAsync(new RecordsOfProcessingBookingMustBeAvailableAsyncRule(this, bookedRecords, checker));

            status = BookingStatus.Booked;
            bookedDate = DateTime.Now;
            AddDomainEvent(new BookingConfirmedEvent(Id, FacilityId));
        }

        public void ChangeRecordStatus(BookedRecordId serviceId, BookedRecordStatus recordStatus)
        {
            bookedRecords
                .First(s => s.Id == serviceId)
                .ChangeStatus(recordStatus);
            
            if (IsCompleted)
            {
                status = BookingStatus.Finished;
                AddDomainEvent(new BookingFinishedEvent(Id));
            }
        }
    }
}