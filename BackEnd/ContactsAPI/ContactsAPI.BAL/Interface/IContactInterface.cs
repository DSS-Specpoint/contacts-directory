using ContactsAPI.MODEL;

namespace ContactsAPI.BAL.Interface
{
    public interface IContactInterface
    {
        Task<IEnumerable<Contact>> GetAllContacts();
        Task<Contact> GetContactById(int id);
        Task<Contact> CreateContact(Contact contact);
        Task UpdateContact(Contact contact);
        Task<bool> DeleteContactById(int id);
    }
}
