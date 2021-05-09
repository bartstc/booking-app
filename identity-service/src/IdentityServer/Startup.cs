using System;
using System.Threading.Tasks;
using IdentityServer.Areas.Identity.Data;
using IdentityServer.Data;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace IdentityServer
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
            services.AddControllersWithViews();
            services.AddRazorPages();

            services.AddDbContext<IdentityServerContext>(options =>
                    options.UseNpgsql(Configuration.GetConnectionString("IdentityServer")));

            services.AddIdentity<IdentityServerUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<IdentityServerContext>()
                .AddDefaultTokenProviders();

            var builder = services.AddIdentityServer()
                .AddInMemoryIdentityResources(Config.IdentityResources)
                .AddInMemoryApiResources(Config.ApiResources)
                .AddInMemoryApiScopes(Config.ApiScopes)
                .AddInMemoryClients(Config.Clients)
                .AddAspNetIdentity<IdentityServerUser>();
                // .AddConfigurationStore(options =>
                // {
                //     options.ConfigureDbContext = b => b.UseSqlite(Configuration.GetConnectionString("Identity"),
                //         sql => sql.MigrationsAssembly(migrationsAssembly));
                // })
                // .AddOperationalStore(options =>
                // {
                //     options.ConfigureDbContext = b => b.UseSqlite(Configuration.GetConnectionString("Identity"),
                //         sql => sql.MigrationsAssembly(migrationsAssembly));
                // });

            // not recommended for production - you need to store your key material somewhere secure
            builder.AddDeveloperSigningCredential();

            services.AddScoped<IProfileService, ProfileService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider services, IdentityServerContext context)
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

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseIdentityServer();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            PrepareDb(services, context);
        }

        private void PrepareDb(IServiceProvider services, IdentityServerContext context)
        {
            var retryCount = 3;
            int currentRetry = 0;
            var delay = TimeSpan.FromSeconds(5);

            for (;;)
            {
                try
                {
                    context.Database.Migrate();
                    //CreateRoles(services).Wait();
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

        private async Task CreateRoles(IServiceProvider services)
        {
            var customerRole = "Customer";
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

            if (!(await roleManager.RoleExistsAsync(customerRole)))
            {
                await roleManager.CreateAsync(new IdentityRole(customerRole));
            }
        }
    }
}
