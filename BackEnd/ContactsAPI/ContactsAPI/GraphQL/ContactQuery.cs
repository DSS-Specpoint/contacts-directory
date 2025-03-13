using ContactManager.Data;
using ContactsAPI.Models;
using HotChocolate;
using HotChocolate.Types;
using System.Linq;

namespace ContactsAPI.GraphQL
{
    public class ContactQuery
    {
        public IQueryable<Contact> SearchContacts([Service] ContactContext context, string searchTerm)
        {
            return context.Contacts.Where(c => c.FirstName.Contains(searchTerm) || c.LastName.Contains(searchTerm) || c.Email.Contains(searchTerm) || c.PhoneNumber.Contains(searchTerm));

        }
    }
}
