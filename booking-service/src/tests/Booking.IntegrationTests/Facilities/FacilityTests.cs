using System;
using System.Threading.Tasks;
using Booking.Api;
using Booking.Application.Facilities.IntegrationEvents.EventHandling;
using Booking.Application.Facilities.IntegrationEvents.Events;
using Booking.Domain.SharedKernel;
using Booking.Infrastructure.Database;
using MassTransit;
using MassTransit.Testing;
using MediatR;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace Booking.IntegrationTests.Facilities
{
    public class FacilityTests : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> factory;

        public FacilityTests(WebApplicationFactory<Startup> factory)
        {
            this.factory = factory;
        }

        [Fact]
        public async Task InMemoryTestHarness_OfferCreatedPublished_OfferPersisted()
        {
            using (var scope = factory.Services.CreateScope())
            {
                var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();
                var ctx = scope.ServiceProvider.GetRequiredService<BookingContext>();
                var harness = new InMemoryTestHarness();
                var consumerHarness = harness.Consumer<OfferCreatedConsumer>(() => new OfferCreatedConsumer(mediator));

                var offerId = new OfferId(Guid.NewGuid());
                var facilityId = new FacilityId(Guid.NewGuid());
                var name = "testowa oferta";
                var price = 50;
                var currency = "PLN";
                short duration = 60;

                await harness.Start();
                try
                {
                    await harness.InputQueueSendEndpoint.Send<OfferCreated>(new
                    {
                        Id = offerId.Value,
                        FacilityId = facilityId.Value,
                        Name = name,
                        Price = price,
                        Currency = currency,
                        Duration = duration
                    });

                    Assert.True(await harness.Consumed.Any<OfferCreated>());
                    Assert.True(await consumerHarness.Consumed.Any<OfferCreated>());
                    Assert.False(await harness.Published.Any<Fault<OfferCreated>>());

                    var persistedOffer = await ctx.Offers.FirstOrDefaultAsync(o => o.Id == offerId);

                    Assert.NotNull(persistedOffer);
                    Assert.Equal(facilityId, persistedOffer.FacilityId);
                    Assert.Equal(price, persistedOffer.Price);
                    Assert.Equal(currency, persistedOffer.Currency);
                    Assert.Equal(duration, persistedOffer.Duration);
                }
                finally
                {
                    await harness.Stop();
                }
            }
        }
    }
}
