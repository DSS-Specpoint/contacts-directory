using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>().HasData(
              new Contact { Id = 1, FirstName = "John", LastName = "Doe", Email = "john@example.com", Phone = "1234567890", Address = "123 Main St" },
              new Contact { Id = 2, FirstName = "Jane", LastName = "Doe", Email = "jane@example.com", Phone = "0987654321", Address = "456 Elm St" },
              new Contact { Id = 3, FirstName = "Alice", LastName = "Smith", Email = "alice@example.com", Phone = "5551234567", Address = "789 Oak St" },
              new Contact { Id = 4, FirstName = "Bob", LastName = "Johnson", Email = "bob@example.com", Phone = "9876543210", Address = "321 Pine St" },
              new Contact { Id = 5, FirstName = "Emily", LastName = "Brown", Email = "emily@example.com", Phone = "4567890123", Address = "456 Maple St" },
              new Contact { Id = 6, FirstName = "Michael", LastName = "Wilson", Email = "michael@example.com", Phone = "3219876543", Address = "987 Cedar St" },
              new Contact { Id = 7, FirstName = "Sarah", LastName = "Jones", Email = "sarah@example.com", Phone = "7890123456", Address = "654 Birch St" },
              new Contact { Id = 8, FirstName = "David", LastName = "Garcia", Email = "david@example.com", Phone = "2345678901", Address = "789 Elm St" },
              new Contact { Id = 9, FirstName = "Emma", LastName = "Martinez", Email = "emma@example.com", Phone = "4321098765", Address = "654 Oak St" },
              new Contact { Id = 10, FirstName = "Christopher", LastName = "Brown", Email = "chris@example.com", Phone = "6543210987", Address = "987 Maple St" }
          );
        }
    }
}
