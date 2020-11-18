using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Accessibility.Infrastructure.Processing.Outbox
{
    public class ProcessOutboxHostedService : BackgroundService
    {
        private readonly IServiceScopeFactory serviceScopeFactory;

        public ProcessOutboxHostedService(IServiceScopeFactory serviceScopeFactory)
        {
            this.serviceScopeFactory = serviceScopeFactory;
        }

        // TODO: only one processing at a time
        // TODO: delay time from configuration
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while(!stoppingToken.IsCancellationRequested)
            {
                using (var scope = serviceScopeFactory.CreateScope())
                {
                    var mediator = scope.ServiceProvider.GetService<IMediator>();
                    await mediator.Send(new ProcessOutboxCommand());
                }

                await Task.Delay(1000 * 5, stoppingToken);
            }
        }
    }
}