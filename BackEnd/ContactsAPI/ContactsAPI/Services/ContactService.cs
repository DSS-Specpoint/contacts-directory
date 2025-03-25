using ContactsAPI.Database;
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
        private readonly ContactDbContext _context;
        public ContactService(ContactDbContext context) => _context = context;

        public async Task<IEnumerable<Contact>> GetAllContactsAsync() => await _context.Contacts.ToListAsync();

        public async Task<Contact?> GetContactByIdAsync(int id) => await _context.Contacts.FindAsync(id);

        public async Task<Contact> CreateContactAsync(Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task<bool> UpdateContactAsync(Contact contact)
        {
            if (!_context.Contacts.Any(c => c.Id == contact.Id)) return false;
            _context.Contacts.Update(contact);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteContactAsync(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null) return false;
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
