using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ContactsAPI.Data;
using ContactsAPI.Mappings;
using ContactsAPI.Models;
using ContactsAPI.Models.DTO;
using ContactsAPI.Repositories;
using ContactsAPI.Services;
using ContactsAPI.Validators;
using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

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

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Specpoint API",
                    Version = "v1",
                    Description = "Description for the API goes here.",
                    Contact = new OpenApiContact
                    {
                        Name = "Deltek Specpoint Developer",
                        Email = string.Empty,
                        Url = new Uri("https://coderjony.com/"),
                    },
                });
            });
            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<IContactRepository, ContactRespository>();
            services.AddDbContext<ContactsDBContext>(options =>
            
                options.UseInMemoryDatabase("ContactsDb"), ServiceLifetime.Singleton
            );
            
            services.AddAutoMapper(typeof(ContactProfile));
            services.AddValidatorsFromAssemblyContaining<CreateContactValidator>();

            services.AddCors(options =>
            {
                options.AddPolicy("MyCorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
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

            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Specpoint API");

                // To serve SwaggerUI at application's root page, set the RoutePrefix property to an empty string.
                c.RoutePrefix = string.Empty;
            });

            using (var scope = app.ApplicationServices.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ContactsDBContext>();
                dbContext.Database.EnsureCreated(); // Ensure database is initialized
                List<Contact> contacts = new() {
                new (){Id = Guid.Parse("f7248fc3-2585-4efb-8d1d-1c555f4087f6"), FirstName="Siddhesh",LastName="Nakashe",Email="sid@gmail.com",PhoneNumber=9876543216},
                new (){Id = Guid.Parse("6884f7d7-ad1f-4101-8df3-7a6fa7387d81"), FirstName="Suriya",LastName="Shetty",Email="suriya98@gmail.com",PhoneNumber=9564732498},
                new (){Id = Guid.Parse("ebc4ad01-9d1e-4577-afce-d44536357bd6"), FirstName="Vineel",LastName="Rathod",Email="vineelRathod@gmail.com",PhoneNumber=9545367388},
                new (){Id = Guid.Parse("bd455150-d00b-4a8a-9ffe-9fc660c16470"), FirstName="Nilesh",LastName="Wabale",Email="nileshWabale980@gmail.com",PhoneNumber=9565367388},
                new (){Id = Guid.Parse("c259a4cb-f6cb-4aa0-a273-96ccf1889cf5"), FirstName="Sai",LastName="Kiran",Email="k.sai45@gmail.com",PhoneNumber=9565367388},
                new (){Id = Guid.Parse("91ffd287-b50e-485f-972f-2e9ba259df76"), FirstName="Shreyas",LastName="Iyer",Email="shreyasIyer10@gmail.com",PhoneNumber=9565367498},
                new (){Id = Guid.Parse("658740a7-7013-414a-8f42-8f7eba1dfbaf"), FirstName="Toyesh",LastName="Singh",Email="toyeshSing11@gmail.com",PhoneNumber=9564367798},
                new (){Id = Guid.Parse("b758a52f-980d-4f2b-a7a0-d64c69263e46"), FirstName="Omkar",LastName="Kambli",Email="omkarKambli@gmail.com",PhoneNumber=9762267798},
                new (){Id = Guid.Parse("13227061-87a7-4a99-9e19-e67619729d61"), FirstName="Rahul",LastName="Yadav",Email="rahulYadav@gmail.com",PhoneNumber=9762244798},
                new (){Id = Guid.Parse("8b52416e-8393-4099-b774-bb7cac53c48e"), FirstName="Bilwakshi",LastName="Pillai",Email="bilwakshiPillai@gmail.com",PhoneNumber=9762244799},
                };
                dbContext.Contacts.AddRange(contacts);// seeding data
                dbContext.SaveChanges();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("MyCorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
