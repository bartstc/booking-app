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
            BookedRecords = new List<BookedRecord>();
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
            this.Status = status;
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

                BookedRecords.Add(bookedRecord);
                
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
        public List<BookedRecord> BookedRecords { get; }
        public BookingStatus Status { get; private set; }
        public bool IsMadeManually { get; }
        private DateTime requestedDate;
        private DateTime bookedDate;
        
        public bool IsCompleted => Status == BookingStatus.Completed || BookedRecords.All(s => s.IsCompleted);
        
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

        public static async Task<Booking> CreateBooked(
            PublicCustomerId customerId,
            FacilityId facilityId,
            List<BookedRecordData> records,
            IBookingPeriodOfTimeChecker checker)
        {
            var booking = new Booking(null, customerId, facilityId, BookingStatus.Booked, records, false);

            await CheckRuleAsync(new RecordsOfProcessingBookingMustBeAvailableAsyncRule(booking, booking.BookedRecords, checker));

            booking.requestedDate = booking.bookedDate = DateTime.Now;

            return booking;
        }

        public static async Task<Booking> CreateBookedManually(
            CustomerId customerId,
            FacilityId facilityId,
            List<BookedRecordData> records,
            IBookingPeriodOfTimeChecker checker)
        {
            var booking = new Booking(customerId, null, facilityId, BookingStatus.Booked, records, true);

            await CheckRuleAsync(new RecordsOfProcessingBookingMustBeAvailableAsyncRule(booking, booking.BookedRecords, checker));

            booking.requestedDate = booking.bookedDate = DateTime.Now;
            
            return booking;
        }

        public async Task SetBooked(IBookingPeriodOfTimeChecker checker)
        {
            CheckRule(new BookingOnStatusChangeMustHaveCorrectPreviousStatusRule(Status, BookingStatus.Booked));
            CheckRule(new BookingRequestingCannotExceedTimeoutRule(requestedDate));
            await CheckRuleAsync(new RecordsOfProcessingBookingMustBeAvailableAsyncRule(this, BookedRecords, checker));

            Status = BookingStatus.Booked;
            bookedDate = DateTime.Now;
            AddDomainEvent(new BookingConfirmedEvent(Id, FacilityId));
        }

        public void ChangeRecordStatus(BookedRecordId bookedRecord, BookedRecordStatus status, string caution = null)
        {
            BookedRecords
                .First(s => s.Id == bookedRecord)
                .ChangeStatus(status, caution);
        }

        public void Archive()
        {
            var records = BookedRecords.Where(r => r.Status == BookedRecordStatus.Booked);

            foreach (var record in records)
            {
                record.ChangeStatus(BookedRecordStatus.Fulfilled);
            }

            if (!IsMadeManually)
            {
                AddDomainEvent(new BookingArchivedEvent(PublicCustomerId, BookedRecords.Select(record => new ArchivedBookedRecord(
                    record.Id,
                    record.EmployeeId,
                    record.OfferId,
                    record.Date,
                    record.DurationInMinutes,
                    record.Status,
                    record.Caution
                ))));
            }
        }
    }
}