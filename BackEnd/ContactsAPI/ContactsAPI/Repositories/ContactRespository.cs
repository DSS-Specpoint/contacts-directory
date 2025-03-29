using ContactsAPI.Data;
using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactsAPI.Repositories
{
    public class ContactRespository : IContactRepository
    {
        private readonly ContactsDBContext dbContext;

        public ContactRespository(ContactsDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Contact> CreateContactAsync(Contact contact)
        {
            await dbContext.Contacts.AddAsync(contact);
            await dbContext.SaveChangesAsync();
            return contact;
        }

        public async Task<Contact> DeleteContactAsync(Guid id)
        {
            Contact existingContact = await dbContext.Contacts.FirstOrDefaultAsync(x => x.Id == id);
            if (existingContact != null)
            {
                dbContext.Contacts.Remove(existingContact);
                await dbContext.SaveChangesAsync();
                return existingContact;
            }
            else
            {
                return null;
            }
        }

        public async Task<List<Contact>> GetAllContactsAsync()
        {
            List<Contact> contacts = await dbContext.Contacts.ToListAsync();
            return contacts;
        }

        public async Task<Contact> GetContactByIdAsync(Guid guid)
        {
            Contact contact = await dbContext.Contacts.FindAsync(guid);
            return contact;
        }

        public async Task<Contact> UpdateContactAsync(Guid id, Contact contact)
        {
            Contact existingContact = await dbContext.Contacts.FirstOrDefaultAsync(x => x.Id == id);
            if (existingContact == null)
            {
                return null;
            }
            else
            {
                existingContact.PhoneNumber = contact.PhoneNumber;
                existingContact.FirstName = contact.FirstName;
                existingContact.LastName = contact.LastName;
                existingContact.Email = contact.Email;
                await dbContext.SaveChangesAsync();
                return existingContact;
            }
        }
    }
}
