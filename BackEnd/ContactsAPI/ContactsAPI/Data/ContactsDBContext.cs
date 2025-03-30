using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace ContactsAPI.Data
{
    public class ContactsDBContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public ContactsDBContext(DbContextOptions<ContactsDBContext> dbContextOptions) : base(dbContextOptions) { }
        
    }
}
