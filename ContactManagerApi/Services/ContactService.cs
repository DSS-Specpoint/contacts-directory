using ContactManagerApi.Repositories;
using ContactManagerApi.Models;

//Business Logic layer
namespace ContactManagerApi.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _repository;

        public ContactService(IContactRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Contact>> GetContacts()
        {
            return await _repository.GetAllContacts();
        }
        public async Task<Contact> GetContactById(int id)
        {
            return await _repository.GetContactById(id);
        }
        
        public async Task AddContact(Contact contact)
        {
            await _repository.AddContact(contact);
        }

        public async Task UpdateContact(Contact contact)
        {
            await _repository.UpdateContact(contact);
        }

        public async Task DeleteContact(int id)
        {
            await _repository.DeleteContact(id);
        }
    }
}
