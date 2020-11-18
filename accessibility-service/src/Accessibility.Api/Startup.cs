using Accessibility.Application.Bookings.CreateBooking;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.SeedWork;
using Accessibility.Infrastructure.Database;
using Accessibility.Infrastructure.Domain;
using Accessibility.Infrastructure.Domain.Bookings;
using Accessibility.Infrastructure.SeedWork;
using Accessibility.Infrastructure.Processing;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Accessibility.Infrastructure.Processing.Outbox;
using Accessibility.Application.Configuration.Database;

namespace Accessibility.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // TODO: move registrations to modules
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<AccessibilityContext>(options =>
                options
                    .ReplaceService<IValueConverterSelector, StronglyTypedIdValueConverterSelector>()
                    .UseNpgsql(Configuration.GetConnectionString("Accessibility")))
                .AddMediatR(typeof(BookingCreatedNotification).Assembly, typeof(BookingCreatedEvent).Assembly, typeof(ProcessOutboxCommand).Assembly)
                .AddTransient<IBookingRepository, BookingRepository>()
                .AddTransient<IUnitOfWork, UnitOfWork>()
                .AddTransient<IDomainEventsDispatcher, DomainEventsDispatcher>()
                .AddHostedService<ProcessOutboxHostedService>()
                .AddScoped<ISqlConnectionFactory>(x => new SqlConnectionFactory(Configuration.GetConnectionString("Accessibility")));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
