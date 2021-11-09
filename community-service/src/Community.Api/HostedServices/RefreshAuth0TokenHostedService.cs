using System;
using System.Threading;
using System.Threading.Tasks;
using Community.Infrastructure.IdentityProvider.Auth0;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Community.Api.HostedServices
{
    public class RefreshAuth0TokenHostedService : BackgroundService
    {
        private readonly IServiceScopeFactory serviceScopeFactory;
        private readonly ILogger<RefreshAuth0TokenHostedService> logger;

        public RefreshAuth0TokenHostedService(
            IServiceScopeFactory serviceScopeFactory,
            ILogger<RefreshAuth0TokenHostedService> logger
        )
        {
            this.serviceScopeFactory = serviceScopeFactory;
            this.logger = logger;
        }
        
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while(!stoppingToken.IsCancellationRequested)
            {
                int expirationTime = 0;

                try
                {
                    using (var scope = serviceScopeFactory.CreateScope())
                    {
                        var tokenService = scope.ServiceProvider.GetService<IAuth0TokenService>();
                        expirationTime = await tokenService.RefreshAccessTokenAsync();
                    }
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Error while refreshing Auth0 access token");
                }

                await Task.Delay(expirationTime * 1000 - 10000, stoppingToken);
            }
        }
    }
}
