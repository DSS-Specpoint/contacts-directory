using ContactsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly ContactsDbContext _context;

        public ContactService(ContactsDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Contact> GetAllContacts()
        {
            return _context.Contacts.ToList();
        }

        public Contact GetContactById(int id)
        {
            return _context.Contacts.FirstOrDefault(c => c.Id == id);
        }

        public void AddContact(Contact contact)
        {
            if (contact == null)
            {
                throw new ArgumentNullException(nameof(contact));
            }

            _context.Contacts.Add(contact);
            _context.SaveChanges();
        }

        public void UpdateContact(Contact contact)
        {
            if (contact == null)
            {
                throw new ArgumentNullException(nameof(contact));
            }

            _context.Contacts.Update(contact);
            _context.SaveChanges();
        }

        public void DeleteContact(int id)
        {
            var contactToDelete = _context.Contacts.FirstOrDefault(c => c.Id == id);
            if (contactToDelete != null)
            {
                _context.Contacts.Remove(contactToDelete);
                _context.SaveChanges();
            }
        }
    }
}
