using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Accessibility.Infrastructure;
using FluentValidation.AspNetCore;
using Accessibility.Infrastructure.Database;
using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Accessibility.Api.Options;
using IdentityServer4.AccessTokenValidation;
using Accessibility.Api.Authorization;
using Microsoft.AspNetCore.Authorization;
using Core;
using Accessibility.Application.Bookings.Commands.CreateBookingRequest;
using Core.DomainEvents;
using Accessibility.Application.Bookings.Commands.ProcessBookingRequest;

namespace Accessibility.Api
{
    public class Startup
    {
        private const string corsPolicyName = "mainCorsPolicy";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                .AddFluentValidation(o => o.RegisterValidatorsFromAssemblyContaining<Startup>());

            services.AddSwaggerGen(options =>
                    options.CustomSchemaIds(x => x.FullName));

            services.AddHttpContextAccessor();

            ConfigureAuth(services);
            ConfigureOptions(services);
            ConfigureCors(services);

            var applicationAssembly = typeof(CreateBookingRequestCommand).Assembly;
            services.AddCoreServices(applicationAssembly);
            services.AddAccessibilityModule(Configuration, typeof(BookingConfirmedNotification).Assembly);
        }

        private void ConfigureOptions(IServiceCollection services)
        {
            services.Configure<BookingRulesOptions>(Configuration.GetSection(
                    BookingRulesOptions.BookingRules
                ))
                .Configure<EventBusOptions>((settings) =>
                {
                    Configuration.GetSection(EventBusOptions.EventBus).Bind(settings);
                });
        }

        private void ConfigureAuth(IServiceCollection services)
        {
            services.AddScoped<IAuthorizationHandler, MustBeEmployeeOfFacilityHandler>();

            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = Configuration["Authentication:Authority"];
                    options.ApiName = "accessibilityapi";
                    options.ApiSecret = "apisecret";
                });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(
                    "MustBeEmployeeOfFacility",
                    policyBuilder =>
                    {
                        policyBuilder.RequireAuthenticatedUser();
                        policyBuilder.RequireClaim("contextType", "employee");
                        policyBuilder.AddRequirements(
                            new MustBeEmployeeOfFacilityRequirement()
                        );
                    }
                );
            });
        }

        private void ConfigureCors(IServiceCollection services)
        {
            var corsOrigins = Configuration.GetSection("CorsOrigins").Get<string[]>();
            services.AddCors(options =>
            {
                options.AddPolicy(corsPolicyName, builder =>
                {
                    builder.WithOrigins(corsOrigins)
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, AccessibilityContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Accessibility API V1");
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors(corsPolicyName);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            PrepareDb(context);
        }

        private static void PrepareDb(AccessibilityContext context)
        {
            var retryCount = 3;
            int currentRetry = 0;
            var delay = TimeSpan.FromSeconds(5);

            for (;;)
            {
                try
                {
                    context.Database.Migrate();
                    break;
                }
                catch (Exception)
                {
                    currentRetry++;

                    if (currentRetry > retryCount)
                    {
                        throw;
                    }

                    Task.Delay(delay);
                }
            }
        }
    }
}
