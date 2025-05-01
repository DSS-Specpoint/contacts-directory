using ContactsAPI.Data;
using ContactsAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactsAPI.Tests.Mocks
{
    public class MockContactRepository : IContactRepository
    {
        private readonly List<Contact> _contacts;

        public MockContactRepository()
        {
            _contacts = new List<Contact>
            {
                new Contact
                {
                    Id = 1,
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john.doe@example.com",
                    PhoneNumber = "1234567890"
                }
            };
        }

        public async Task<IEnumerable<Contact>> GetAllAsync()
        {
            return await Task.FromResult(_contacts);
        }

        public async Task<Contact?> GetByIdAsync(int id)
        {
            return await Task.FromResult(_contacts.Find(c => c.Id == id));
        }

        public async Task<int> CreateAsync(Contact contact)
        {
            contact.Id = _contacts.Count + 1;
            _contacts.Add(contact);
            return await Task.FromResult(contact.Id);
        }

        public async Task<bool> UpdateAsync(int id, Contact contact)
        {
            var existingContact = _contacts.Find(c => c.Id == id);
            if (existingContact == null)
                return await Task.FromResult(false);

            existingContact.FirstName = contact.FirstName;
            existingContact.LastName = contact.LastName;
            existingContact.Email = contact.Email;
            existingContact.PhoneNumber = contact.PhoneNumber;

            return await Task.FromResult(true);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var contact = _contacts.Find(c => c.Id == id);
            if (contact == null)
                return await Task.FromResult(false);

            _contacts.Remove(contact);
            return await Task.FromResult(true);
        }
    }
} 