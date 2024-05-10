using ContactsAPI.BAL.Service;
using ContactsAPI.DAL;
using ContactsAPI.DAL.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using ContactsAPI.Helper;
using IContactInterfaceBAL = ContactsAPI.BAL.Interface.IContactInterface;
using IContactInterfaceDAL = ContactsAPI.DAL.Interface.IContactInterface;

namespace ContactsAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddScoped<IContactInterfaceBAL, ContactService>();
            services.AddScoped<IContactInterfaceDAL, ContactRepository>();
            services.AddDbContext<ApplicationDBContext>(option =>
                option.UseInMemoryDatabase(Configuration.GetConnectionString("SpeckPointDB"))
            );
            services.AddCors(c => c.AddPolicy("CorsPolicy", builder => {
                builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            }));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Specpoint Contact API",
                    Version = "v1",
                    Description = "Contact Manager API",
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");

            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Specpoint API");

                // To serve SwaggerUI at application's root page, set the RoutePrefix property to an empty string.
                c.RoutePrefix = string.Empty;
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            // Retrieve IHost instance from ApplicationServices
            var host = app.ApplicationServices.GetService<IHost>();

            // Check if host is not null and then call SeedDatabase
            host?.SeedDatabase();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
