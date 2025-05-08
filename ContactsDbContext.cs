using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI
{
    public class ContactsDbContext : DbContext
    {
        public ContactsDbContext(DbContextOptions<ContactsDbContext> options)
            : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
