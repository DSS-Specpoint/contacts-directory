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
            new Contact { Id = 1, FirstName = "Amit", LastName = "Sharma", Email = "amit.sharma@example.com", Phone = "+91-98765-43210" },
            new Contact { Id = 2, FirstName = "Priya", LastName = "Patel", Email = "priya.patel@example.com", Phone = "+91-98765-43211" },
            new Contact { Id = 3, FirstName = "Ravi", LastName = "Kumar", Email = "ravi.kumar@example.com", Phone = "+91-98765-43212" },
            new Contact { Id = 4, FirstName = "Neha", LastName = "Gupta", Email = "neha.gupta@example.com", Phone = "+91-98765-43213" },
            new Contact { Id = 5, FirstName = "Suresh", LastName = "Reddy", Email = "suresh.reddy@example.com", Phone = "+91-98765-43214" },
            new Contact { Id = 6, FirstName = "Anjali", LastName = "Singh", Email = "anjali.singh@example.com", Phone = "+91-98765-43215" },
            new Contact { Id = 7, FirstName = "Vikram", LastName = "Jain", Email = "vikram.jain@example.com", Phone = "+91-98765-43216" },
            new Contact { Id = 8, FirstName = "Kavita", LastName = "Mehta", Email = "kavita.mehta@example.com", Phone = "+91-98765-43217" },
            new Contact { Id = 9, FirstName = "Ajay", LastName = "Verma", Email = "ajay.verma@example.com", Phone = "+91-98765-43218" },
            new Contact { Id = 10, FirstName = "Sonia", LastName = "Malhotra", Email = "sonia.malhotra@example.com", Phone = "+91-98765-43219" }
        );


        }
    }
}
