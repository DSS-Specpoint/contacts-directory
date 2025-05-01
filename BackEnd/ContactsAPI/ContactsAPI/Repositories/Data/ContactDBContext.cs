using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace ContactsAPI.Repositories.Data
{
    public class ContactDBContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public ContactDBContext(DbContextOptions<ContactDBContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var contacts = new List<Contact>();
            for (int i = 1; i <= 10; i++)
            {
                contacts.Add(new Contact
                {
                    Id = i,
                    FirstName = $"First{i}",
                    LastName = $"Last{i}",
                    Email = $"user{i}@email.com",
                    PhoneNumber = $"123-456-78{i:D2}",
                    CreatedAt = DateTime.UtcNow
                });
            }

            modelBuilder.Entity<Contact>().HasData(contacts.ToArray());

            base.OnModelCreating(modelBuilder); 
        }
    }
}
