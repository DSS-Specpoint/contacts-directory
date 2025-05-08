using ContactsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    /// <summary>
    /// Service that supports basic CRUD operations. 
    /// </summary>
    public interface IContactService
    {
        /// <summary>
        /// Get all the contacts.
        /// </summary>
        /// <returns><seealso cref="Contact"/></returns>
        IEnumerable<Contact> GetAllContacts();

        /// <summary>
        /// Get Contact by Id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns><seealso cref="Contact"/></returns>
        Contact GetContactById(int id);

        /// <summary>
        /// Add new contact in the contact list.
        /// </summary>
        /// <param name="contact"></param>
        void AddContact(Contact contact);

        /// <summary>
        /// Update existing contact.
        /// </summary>
        /// <param name="contact"></param>
        void UpdateContact(Contact contact);

        /// <summary>
        /// Delete the existing contact.
        /// </summary>
        /// <param name="id"></param>
        void DeleteContact(int id);
    }
}
