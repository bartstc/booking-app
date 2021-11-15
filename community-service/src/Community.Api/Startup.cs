using System;
using System.Text.Json.Serialization;
using Community.Api.HostedServices;
using Community.Application.Members.Commands.CreateMember;
using Community.Infrastructure;
using Community.Infrastructure.Options;
using Core;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace Community.Api
{
    public class Startup
    {
        private readonly IWebHostEnvironment webHostEnvironment;

        public Startup(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            Configuration = configuration;
            this.webHostEnvironment = webHostEnvironment;
        }

        public IConfiguration Configuration { get; }

        private string GetHerokuConnectionString()
        {
            string connectionUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

            var databaseUri = new Uri(connectionUrl);

            string db = databaseUri.LocalPath.TrimStart('/');
            string[] userInfo = databaseUri.UserInfo.Split(':', StringSplitOptions.RemoveEmptyEntries);

            return $"Host={databaseUri.Host};Database={db};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=True;";
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Community.Api", Version = "v1" });
            });

            var applicationAssembly = typeof(CreateMemberCommand).Assembly;

            if (!webHostEnvironment.IsDevelopment() && Configuration["Deployment"] == "Heroku")
                Configuration["EventStore:ConnectionString"] = GetHerokuConnectionString();

            services
                .AddCoreServices(applicationAssembly)
                .AddCommunityModule(Configuration)
                .Configure<Auth0Options>(Configuration.GetSection(Auth0Options.Auth0))
                .AddHostedService<RefreshAuth0TokenHostedService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Community.Api v1"));

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
