using ContactsAPI.ENTITY;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactsAPI.DAL.Interface
{
    public interface IContactRepository
    {
       
            Task<IEnumerable<Contact>> GetAllContacts();
            Task<Contact> GetContactById(int id);
            Task<Contact> CreateConatct(Contact contact);
            Task UpdateConytact(Contact contact);
            Task<bool> DeleteContactById(int id);
        
    }
}
