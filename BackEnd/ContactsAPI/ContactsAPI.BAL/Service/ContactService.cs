using ContactsAPI.BAL.Interface;
using ContactsAPI.DAL.Interface;
using ContactsAPI.ENTITY;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactsAPI.BAL.Service
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;
        public ContactService(IContactRepository contactRepository)
        {
         
            _contactRepository = contactRepository;
        }
        public Task<IEnumerable<Contact>> GetAllContacts() => _contactRepository.GetAllContacts();

        public Task<Contact> GetContactById(int id) => _contactRepository.GetContactById(id);

        public Task<Contact> CreateContact(Contact contact) => _contactRepository.CreateConatct(contact);

        public Task UpdateContact(Contact contact) => _contactRepository.UpdateConytact(contact);

        public Task<bool> DeleteContactById(int id) => _contactRepository.DeleteContactById(id);
    }
}
