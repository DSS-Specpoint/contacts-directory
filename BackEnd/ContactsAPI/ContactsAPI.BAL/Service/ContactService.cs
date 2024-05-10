using ContactsAPI.BAL.Interface;
using ContactsAPI.MODEL;

namespace ContactsAPI.BAL.Service
{
    // Implementation of IContactInterface in ContactService class
    public class ContactService : IContactInterface
    {
        private readonly ContactsAPI.DAL.Interface.IContactInterface _contactInterface; // Instance variable to interact with DAL

        // Constructor to initialize ContactService with DAL interface
        public ContactService(ContactsAPI.DAL.Interface.IContactInterface contactInterface)
        {
            _contactInterface = contactInterface; // Assigning injected DAL interface
        }

        // Method to get all contacts asynchronously
        public Task<IEnumerable<Contact>> GetAllContacts() => _contactInterface.GetAllContacts();

        // Method to get contact by id asynchronously
        public Task<Contact> GetContactById(int id) => _contactInterface.GetContactById(id);

        // Method to create a new contact asynchronously
        public Task<Contact> CreateContact(Contact contact) => _contactInterface.CreateConatct(contact);

        // Method to update an existing contact asynchronously
        public Task UpdateContact(Contact contact) => _contactInterface.UpdateConytact(contact);

        // Method to delete a contact by id asynchronously
        public Task<bool> DeleteContactById(int id) => _contactInterface.DeleteContactById(id);
    }
}
