using ContactsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
        Task<IEnumerable<ContactResponse>> GetAllAsync();
        Task<ContactResponse?> GetByIdAsync(int id);
        Task<int> CreateAsync(ContactRequest contactRequest);
        Task<bool> UpdateAsync(int id, ContactRequest contactRequest);
        Task<bool> DeleteAsync(int id);
    }
}
