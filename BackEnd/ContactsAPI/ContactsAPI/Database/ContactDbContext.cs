using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Database
{
    public class ContactDbContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }
        public ContactDbContext(DbContextOptions<ContactDbContext> options) : base(options) { }
    }
}
