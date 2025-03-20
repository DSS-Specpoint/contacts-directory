using ContactsAPI.Data;
using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly AppDbContext _context;
        public ContactService(AppDbContext context)
        {
            _context = context;
        }

        List<Contact> IContactService.GetAllContacts()
        {
            var contacts = _context.Contacts.ToListAsync().Result;
            return contacts;
        }
        public Contact GetContacts(int id)
        {
            var contact = _context.Contacts.FindAsync(id).Result;
            return contact;
        }
    }
}
