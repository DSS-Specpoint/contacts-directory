using Microsoft.EntityFrameworkCore;
using ContactsAPI.Models;

namespace ContactsAPI.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Contact>().HasData(
                new Contact { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Phone = "123-456-7890" },
                new Contact { Id = 2, FirstName = "Jane", LastName = "Smith", Email = "jane.smith@example.com", Phone = "234-567-8901" },
                new Contact { Id = 3, FirstName = "Mary", LastName = "Johnson", Email = "mary.johnson@example.com", Phone = "345-678-9012" },
                new Contact { Id = 4, FirstName = "James", LastName = "Williams", Email = "james.williams@example.com", Phone = "456-789-0123" },
                new Contact { Id = 5, FirstName = "Patricia", LastName = "Brown", Email = "patricia.brown@example.com", Phone = "567-890-1234" },
                new Contact { Id = 6, FirstName = "Michael", LastName = "Jones", Email = "michael.jones@example.com", Phone = "678-901-2345" },
                new Contact { Id = 7, FirstName = "Linda", LastName = "Miller", Email = "linda.miller@example.com", Phone = "789-012-3456" },
                new Contact { Id = 8, FirstName = "David", LastName = "Davis", Email = "david.davis@example.com", Phone = "890-123-4567" },
                new Contact { Id = 9, FirstName = "Elizabeth", LastName = "Garcia", Email = "elizabeth.garcia@example.com", Phone = "901-234-5678" },
                new Contact { Id = 10, FirstName = "William", LastName = "Martinez", Email = "william.martinez@example.com", Phone = "012-345-6789" }
            );
        }
    }
}
