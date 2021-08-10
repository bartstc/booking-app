using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Accessibility.Application.Facilities;
using Accessibility.Domain.SharedKernel;
using Core.IntegrationEvents;
using ExternalEvents.Accessibility.Bookings;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.ArchiveCompletedBookings
{
    public class BookingArchivedNotificationHandler : INotificationHandler<BookingArchivedNotification>
    {
        private readonly IOfferRepository offerRepository;
        private readonly IEmployeeRepository employeeRepository;
        private readonly IMessageBus messageBus;

        public BookingArchivedNotificationHandler(
            IOfferRepository offerRepository,
            IEmployeeRepository employeeRepository,
            IMessageBus messageBus)
        {
            this.offerRepository = offerRepository;
            this.employeeRepository = employeeRepository;
            this.messageBus = messageBus;
        }

        public async Task Handle(BookingArchivedNotification notification, CancellationToken cancellationToken)
        {
            var offerIds = new List<OfferId>();
            var employeeIds = new List<EmployeeId>();

            foreach (var bookedRecord in notification.BookedRecords)
            {
                offerIds.Add(bookedRecord.OfferId);
                employeeIds.Add(bookedRecord.EmployeeId);
            }

            var offers = await offerRepository.GetByIdsAsync(offerIds);
            var employees = await employeeRepository.GetByIdsAsync(employeeIds);
            var messageBookedRecords = MapBookedRecords(notification, offers, employees);

            var message = new BookingCompleted(notification.CustomerId.Value, messageBookedRecords);

            await messageBus.PublishAsync(message);
        }

        private List<BookedRecord> MapBookedRecords(BookingArchivedNotification notification, IEnumerable<Offer> offers, IEnumerable<Employee> employees)
        {
            var messageBookedRecords = new List<BookedRecord>();

            foreach (var bookedRecord in notification.BookedRecords)
            {
                var offer = offers.First(o => o.Id == bookedRecord.OfferId);
                var employee = employees.First(e => e.Id == bookedRecord.EmployeeId);

                messageBookedRecords.Add(new BookedRecord(
                    new ExternalEvents.Accessibility.Bookings.Dtos.Offer(offer.Name, offer.Id.Value),
                    null,
                    new ExternalEvents.Accessibility.Bookings.Dtos.Employee(employee.Name, employee.Id.Value),
                    bookedRecord.Date,
                    bookedRecord.DurationInMinutes,
                    bookedRecord.Id.Value,
                    (BookedRecordStatus)Enum.Parse(typeof(BookedRecordStatus), bookedRecord.Status.ToString()),
                    bookedRecord.Caution
                ));
            }

            return messageBookedRecords;
        }
    }
}
