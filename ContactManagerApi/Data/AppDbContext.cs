using Microsoft.EntityFrameworkCore;
using ContactManagerApi.Models;

// This will add static data whenever user starts backend.
// Added my 10 friends.
namespace ContactManagerApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>().HasData(
                new Contact { Id = 1, Name = "Harsh", Email = "Harsh@example.com", Phone = "123-456-7890", Address = "Noida, UP", Job = "Engineer" },
                new Contact { Id = 2, Name = "mohit", Email = "mohit@example.com", Phone = "987-654-3210", Address = "Noida, UP", Job = "Engineer" },
                new Contact { Id = 3, Name = "Sohan", Email = "Sohan@example.com", Phone = "555-123-4567", Address = "Noida, UP", Job = "Engineer" },
                new Contact { Id = 4, Name = "Parth", Email = "Parth@example.com", Phone = "111-222-3333", Address = "Noida, UP", Job = "Engineer" },
                new Contact { Id = 5, Name = "Kashif", Email = "Kashif@example.com", Phone = "444-555-6666", Address = "Gurgaon, HR", Job = "Engineer" },
                new Contact { Id = 6, Name = "Madhur", Email = "Madhur@example.com", Phone = "777-888-9999", Address = "Gurgaon, HR", Job = "Engineer" },
                new Contact { Id = 7, Name = "Dipesh", Email = "Dipesh@example.com", Phone = "222-333-4444", Address = "Gurgaon, HR", Job = "Engineer" },
                new Contact { Id = 8, Name = "Kushal", Email = "Kushal@example.com", Phone = "666-777-8888", Address = "Gurgaon, HR", Job = "Engineer" },
                new Contact { Id = 9, Name = "Kushagra", Email = "Kushagra@example.com", Phone = "999-000-1111", Address = "Chandigarh, PJ", Job = "Engineer" },
                new Contact { Id = 10, Name = "Harshit", Email = "Harshit@example.com", Phone = "333-444-5555", Address = "Chandigarh, PJ", Job = "Engineer" }
            );
        }
    }
}
