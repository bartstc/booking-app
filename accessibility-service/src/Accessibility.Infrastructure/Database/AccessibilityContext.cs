using Accessibility.Domain.Bookings;
using Microsoft.EntityFrameworkCore;

namespace Accessibility.Infrastructure.Database
{
    public class AccessibilityContext : DbContext
    {
        public AccessibilityContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AccessibilityContext).Assembly);
        }
    }
}
