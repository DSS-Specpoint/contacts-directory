using ContactsAPI.ENTITY;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactsAPI.BAL.Interface
{
    public interface IContactService
    {
        Task<IEnumerable<Contact>> GetAllContacts();
        Task<Contact> GetContactById(int id);
        Task<Contact> CreateContact(Contact contact);
        Task UpdateContact(Contact contact);
        Task<bool> DeleteContactById(int id);

    }
}
