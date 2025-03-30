using ContactsAPI.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactsAPI.Repositories
{
    public interface IContactRepository
    {
        Task<List<Contact>> GetAllContactsAsync();
        Task<Contact> GetContactByIdAsync(Guid guid);
        Task<Contact> CreateContactAsync(Contact contact);
        Task<Contact> UpdateContactAsync(Guid id, Contact contact);
        Task<Contact> DeleteContactAsync(Guid id);
    }
}
