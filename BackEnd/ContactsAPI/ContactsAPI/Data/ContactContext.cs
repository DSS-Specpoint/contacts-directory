using Microsoft.EntityFrameworkCore;
using ContactsAPI.Models;
using System.Linq;

namespace ContactManager.Data
{
    public class ContactContext : DbContext
    {
        public ContactContext(DbContextOptions<ContactContext> options)
            : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Contact>().HasData(
                new Contact { Id = 1, LastName = "Kumar", FirstName = "Arvind", Email = "arvind.kumar@gmail.com", PhoneNumber = "1112223333" },
                new Contact { Id = 2, LastName = "Rajendran", FirstName = "Priya", Email = "priya.rajendran@gmail.com", PhoneNumber = "2223334444" },
                new Contact { Id = 3, LastName = "Venkatesh", FirstName = "Suresh", Email = "suresh.venkatesh@gmail.com", PhoneNumber = "3334445555" },
                new Contact { Id = 4, LastName = "Iyengar", FirstName = "Ananya", Email = "ananya.iyengar@gmail.com", PhoneNumber = "4445556666" },
                new Contact { Id = 5, LastName = "Reddy", FirstName = "Karthik", Email = "karthik.reddy@gmail.com", PhoneNumber = "5556667777" },
                new Contact { Id = 6, LastName = "Menon", FirstName = "Divya", Email = "divya.menon@gmail.com", PhoneNumber = "6667778888" },
                new Contact { Id = 7, LastName = "Nair", FirstName = "Rahul", Email = "rahul.nair@gmail.com", PhoneNumber = "7778889999" },
                new Contact { Id = 8, LastName = "Gowda", FirstName = "Meera", Email = "meera.gowda@gmail.com", PhoneNumber = "8889990000" },
                new Contact { Id = 9, LastName = "Pillai", FirstName = "Vikram", Email = "vikram.pillai@gmail.com", PhoneNumber = "9990001111" },
                new Contact { Id = 10, LastName = "Chandran", FirstName = "Swathi", Email = "swathi.chandran@gmail.com", PhoneNumber = "0001112222" }

            );
        }

        public IQueryable<Contact> SearchContacts(string searchTerm)
        {
            return Contacts.Where(c => c.FirstName.Contains(searchTerm) || c.LastName.Contains(searchTerm) || c.Email.Contains(searchTerm) || c.PhoneNumber.Contains(searchTerm));
        }
    }
}
