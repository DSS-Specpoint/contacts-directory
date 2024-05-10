using ContactsAPI.MODEL;

namespace ContactsAPI.DAL.Interface
{
    public interface IContactInterface
    {
        Task<IEnumerable<Contact>> GetAllContacts();
        Task<Contact> GetContactById(int id);
        Task<Contact> CreateConatct(Contact contact);
        Task UpdateConytact(Contact contact);
        Task<bool> DeleteContactById(int id);
    }
}
