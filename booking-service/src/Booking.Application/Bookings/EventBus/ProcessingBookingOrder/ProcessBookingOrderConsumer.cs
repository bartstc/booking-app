using System.Linq;
using System.Threading.Tasks;
using Booking.Domain.Bookings;
using Booking.Domain.Bookings.BookedRecords;
using Booking.Domain.SeedWork;
using Booking.Domain.SharedKernel;
using MassTransit;

namespace Booking.Application.Bookings.EventBus.ProcessingBookingOrder
{
    public class ProcessBookingOrderConsumer : IConsumer<ProcessBookingOrder>
    {
        private readonly IBookingRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public ProcessBookingOrderConsumer(IBookingRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public async Task Consume(ConsumeContext<ProcessBookingOrder> context)
        {
            var booking = Booking.Domain.Bookings.Booking.CreateBooked(
                context.Message.CustomerId,
                context.Message.FacilityId,
                context.Message.BookedRecords.Select(r => new BookedRecordData(
                    r.EmployeeId,
                    r.OfferId,
                    Money.Of(50, "PLN"),
                    r.Date,
                    60
                )).ToList()
            );

            await repository.AddAsync(booking);
            await unitOfWork.CommitAsync();
        }
    }
}
