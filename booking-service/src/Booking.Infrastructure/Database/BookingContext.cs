using Booking.Application.Facilities.IntegrationEvents.Events;
using Booking.Infrastructure.Processing.Outbox;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Database
{
    public class BookingContext : DbContext
    {
        public BookingContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Booking.Domain.Bookings.Booking> Bookings { get; set; }
        public DbSet<OfferCreated> Offers { get; set; }
        public DbSet<OutboxNotification> OutboxNotifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(BookingContext).Assembly);
        }
    }
}
