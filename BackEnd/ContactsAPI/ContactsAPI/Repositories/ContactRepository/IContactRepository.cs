using ContactsAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactsAPI.Data
{
    public interface IContactRepository
    {
        Task<IEnumerable<Contact>> GetAllAsync();
        Task<Contact?> GetByIdAsync(int id);
        Task<int> CreateAsync(Contact contact);
        Task<bool> UpdateAsync(int id, Contact contact);
        Task<bool> DeleteAsync(int id);
    }
}
