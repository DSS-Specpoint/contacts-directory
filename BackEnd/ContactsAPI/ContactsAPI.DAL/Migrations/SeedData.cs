using ContactsAPI.MODEL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ContactsAPI.DAL.Migrations
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDBContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDBContext>>()))
            {
                // Check if data already exists
                if (context.Contacts.Any())
                {
                    return;   // Data was already seeded
                }

                context.Contacts.AddRange(
                    new Contact { ContactId = 1, FirstName = "Bhargav", LastName = "Virani", Address = "1st Floor, Test", Email = "b@b.com", Phone = "1234567890" },
                    new Contact { ContactId = 2, FirstName = "John", LastName = "David", Address = "2nd Floor, Test", Email = "j@j.com", Phone = "1234567890" },
                    new Contact { ContactId = 3, FirstName = "Steve", LastName = "Fake", Address = "3nd Floor, Test", Email = "s@s.com", Phone = "1234567890" },
                    new Contact { ContactId = 4, FirstName = "Lata", LastName = "Dande", Address = "4nd Floor, Test", Email = "l@l.com", Phone = "1234567890" },
                    new Contact { ContactId = 5, FirstName = "Amit", LastName = "Patel", Address = "5th Floor, Test", Email = "a@a.com", Phone = "1234567890" },
                    new Contact { ContactId = 6, FirstName = "Emily", LastName = "Smith", Address = "6th Floor, Test", Email = "e@e.com", Phone = "1234567890" },
                    new Contact { ContactId = 7, FirstName = "Michael", LastName = "Johnson", Address = "7th Floor, Test", Email = "m@m.com", Phone = "1234567890" },
                    new Contact { ContactId = 8, FirstName = "Sophia", LastName = "Lee", Address = "8th Floor, Test", Email = "sophia@s.com", Phone = "1234567890" },
                    new Contact { ContactId = 9, FirstName = "Ravi", LastName = "Kumar", Address = "9th Floor, Test", Email = "ravi@r.com", Phone = "1234567890" },
                    new Contact { ContactId = 10, FirstName = "Emma", LastName = "Taylor", Address = "10th Floor, Test", Email = "emma@e.com", Phone = "1234567890" }
                );
                context.SaveChanges();
            }
        }
    }
}
