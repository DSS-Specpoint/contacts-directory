using ContactsAPI.Models;
using ContactsAPI.Repositories.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactsAPI.Data
{
    public class ContactRepository : IContactRepository
    {
        private readonly ContactDBContext _context;

        public ContactRepository(ContactDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Contact>> GetAllAsync()
        {
            return await _context.Contacts.ToListAsync();
        }

        public async Task<Contact?> GetByIdAsync(int id)
        {
            return await _context.Contacts.FindAsync(id);
        }

        public async Task<int> CreateAsync(Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact.Id;
        }

        public async Task<bool> UpdateAsync(int id, Contact contact)
        {
            if (id != contact.Id) return false;

            var existingContact = await _context.Contacts.FindAsync(id);
            if (existingContact == null) return false;

            existingContact.FirstName = contact.FirstName;
            existingContact.LastName = contact.LastName;
            existingContact.Email = contact.Email;
            existingContact.PhoneNumber = contact.PhoneNumber;

            var updated = await _context.SaveChangesAsync();
            return updated > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null) return false;

            _context.Contacts.Remove(contact);
            var deleted = await _context.SaveChangesAsync();
            return deleted > 0;
        }
    }
}
