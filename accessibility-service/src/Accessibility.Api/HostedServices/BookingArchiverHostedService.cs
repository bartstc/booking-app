using System;
using System.Threading;
using System.Threading.Tasks;
using Accessibility.Application.Bookings.Commands.ArchiveCompletedBookings;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Accessibility.Api.HostedServices
{
    public class BookingArchiverHostedService : BackgroundService
    {
        private readonly IServiceScopeFactory serviceScopeFactory;
        private readonly ILogger<BookingArchiverHostedService> logger;

        public BookingArchiverHostedService(
            IServiceScopeFactory serviceScopeFactory,
            ILogger<BookingArchiverHostedService> logger)
        {
            this.serviceScopeFactory = serviceScopeFactory;
            this.logger = logger;
        }

        // TODO: only one processing at a time
        // TODO: delay time from configuration
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while(!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = serviceScopeFactory.CreateScope())
                    {
                        var mediator = scope.ServiceProvider.GetService<IMediator>();
                        await mediator.Send(new ArchiveCompletedBookingsCommand());
                    }
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Error while archiving the booking");
                }

                await Task.Delay(1000 * 5, stoppingToken);
            }
        }
    }
}
