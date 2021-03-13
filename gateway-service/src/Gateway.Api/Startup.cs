using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace Gateway.Api
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
            var corsOrigins = Configuration.GetSection("CorsOrigins").Get<string[]>();
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(corsOrigins);
                });
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Gateway.Api", Version = "v1" });
            });
            // services.AddAuthentication("Bearer")
            //     .AddJwtBearer("Bearer", options =>
            //     {
            //         options.Authority = Configuration["IdentityUrl"];

            //         // TODO: remove when running in a production
            //         options.RequireHttpsMetadata = false;

            //         options.TokenValidationParameters = new TokenValidationParameters
            //         {
            //             ValidateAudience = false,
            //             ValidateIssuer = false
            //         };
            //     });
            services.AddOcelot();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Gateway.Api v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            // app.UseAuthentication();
            app.UseOcelot().Wait();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
