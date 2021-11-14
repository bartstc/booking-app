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
using Accessibility.Api.Authorization;
using Microsoft.AspNetCore.Authorization;
using Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Accessibility.Application.Bookings.Commands.CreateBooking;
using Accessibility.Api.HostedServices;

namespace Accessibility.Api
{
    public class Startup
    {
        private const string corsPolicyName = "mainCorsPolicy";
        private readonly IWebHostEnvironment webHostEnvironment;

        public Startup(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            Configuration = configuration;
            this.webHostEnvironment = webHostEnvironment;
        }

        public IConfiguration Configuration { get; }

        private string GetHerokuConnectionString() {
            string connectionUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

            var databaseUri = new Uri(connectionUrl);

            string db = databaseUri.LocalPath.TrimStart('/');
            string[] userInfo = databaseUri.UserInfo.Split(':', StringSplitOptions.RemoveEmptyEntries);

            return $"Host={databaseUri.Host};Database={db};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=True;";
        }

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

            if (!webHostEnvironment.IsDevelopment())
                Configuration["ConnectionStrings:Accessibility"] = GetHerokuConnectionString();

            var applicationAssembly = typeof(CreateBookingCommand).Assembly;
            services.AddCoreServices(applicationAssembly);
            services.AddAccessibilityModule(Configuration, applicationAssembly);
            services.AddHostedService<BookingArchiverHostedService>();
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
            
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.Authority = Configuration["Authentication:Authority"];
                    options.Audience = "accessibility";
                });

            // services.AddAuthorization(options =>
            // {
            //     options.AddPolicy(
            //         "MustBeEmployeeOfFacility",
            //         policyBuilder =>
            //         {
            //             policyBuilder.RequireAuthenticatedUser();
            //             policyBuilder.RequireClaim("contextType", "employee");
            //             policyBuilder.AddRequirements(
            //                 new MustBeEmployeeOfFacilityRequirement()
            //             );
            //         }
            //     );
            // });
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
