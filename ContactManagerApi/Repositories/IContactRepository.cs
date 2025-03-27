using ContactManagerApi.Models;

namespace ContactManagerApi.Repositories
{
    // Creating interface for our API's
    // Here I am seperating Repository : Repository pattern
    public interface IContactRepository
    {
        Task<IEnumerable<Contact>> GetAllContacts();
        Task<Contact> GetContactById(int id);
        Task AddContact(Contact contact);
        Task UpdateContact(Contact contact);
        Task DeleteContact(int id);
    }
}
