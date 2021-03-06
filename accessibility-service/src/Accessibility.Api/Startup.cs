using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Accessibility.Infrastructure;
using FluentValidation.AspNetCore;
using Accessibility.Application.Schedules.Commands.CreateSchedule;
using Accessibility.Infrastructure.Database;
using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Accessibility.Api.Options;

namespace Accessibility.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                .AddFluentValidation(o => o.RegisterValidatorsFromAssemblyContaining<Startup>());
            
            services.ConfigureAccessibility(
                Configuration,
                typeof(CreateScheduleCommand).Assembly)
            .AddSwaggerGen(options =>
                    options.CustomSchemaIds(x => x.FullName))
            .Configure<BookingRulesOptions>(Configuration.GetSection(
                BookingRulesOptions.BookingRules
            ));
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
