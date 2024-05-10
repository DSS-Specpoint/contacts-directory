using ContactsAPI.DAL;
using ContactsAPI.DAL.Migrations;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace ContactsAPI.Helper
{
    public static class WebApiExtensions
    {
        // Extension method to seed the database when the application starts
        public static IHost SeedDatabase(this IHost host)
        {
            // Create a scope for service resolution
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    // Resolve the ApplicationDBContext service
                    var context = services.GetRequiredService<ApplicationDBContext>();

                    // Seed the database with initial data
                    SeedData.Initialize(services);
                }
                catch (Exception ex)
                {
                    // Log any exceptions that occur during database seeding
                    Console.WriteLine($"An error occurred while seeding the database: {ex.Message}");
                }
            }
            return host;
        }
    }
}
