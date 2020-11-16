using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Accessibility.Application.Bookings.CreateBooking;
using Accessibility.Application.Configuration.DomainEvents;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.SeedWork;
using Accessibility.Infrastructure.Database;
using Accessibility.Infrastructure.Domain;
using Accessibility.Infrastructure.Domain.Bookings;
using Accessibility.Infrastructure.SeedWork;
using Accessibility.Infrastructure.Utils;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

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
                    .UseNpgsql(Configuration.GetConnectionString("Accessibility")));
            services.AddMediatR(typeof(BookingCreatedNotification).Assembly, typeof(BookingCreatedEvent).Assembly);
            services.AddTransient<IBookingRepository, BookingRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IDomainEventsDispatcher, DomainEventsDispatcher>();
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
