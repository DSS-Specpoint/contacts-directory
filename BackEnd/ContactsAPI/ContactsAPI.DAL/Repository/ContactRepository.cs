using ContactsAPI.DAL.Interface;
using ContactsAPI.MODEL;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.DAL.Repository
{
    // Repository class implementing the interface IContactInterface
    public class ContactRepository : IContactInterface
    {
        private readonly ApplicationDBContext _context;

        // Constructor injecting ApplicationDBContext
        public ContactRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        // Method to get all contacts asynchronously
        public async Task<IEnumerable<Contact>> GetAllContacts()
        {
            return await _context.Contacts.ToListAsync();
        }

        // Method to get a contact by its ID asynchronously
        public async Task<Contact> GetContactById(int id)
        {
            return await _context.Contacts.FindAsync(id);
        }

        // Method to create a new contact asynchronously
        public async Task<Contact> CreateConatct(Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        // Method to update an existing contact asynchronously
        public async Task UpdateConytact(Contact contact)
        {
            _context.Contacts.Update(contact);
            await _context.SaveChangesAsync();
        }

        // Method to delete a contact by its ID asynchronously
        public async Task<bool> DeleteContactById(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return false;
            }
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
