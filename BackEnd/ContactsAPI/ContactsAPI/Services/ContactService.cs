using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using ContactManager.Data;
using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly ContactContext _context;

        public ContactService(ContactContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Contact>> GetAllContactsAsync()
        {
            try
            {
                return await _context.Contacts.ToListAsync();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error in GetAllContactsAsync: {ex.Message}");
                throw;
            }
        }

        public async Task<Contact> GetContactByIdAsync(int id)
        {
            try
            {
                return await _context.Contacts.FindAsync(id);
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error in GetContactByIdAsync: {ex.Message}");
                throw;
            }
        }

        public async Task<Contact> CreateContactAsync(Contact contact)
        {
            try
            {
                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync();
                return contact;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error in CreateContactAsync: {ex.Message}");
                throw;
            }
        }

        public async Task UpdateContactAsync(Contact contact)
        {
            try
            {
                _context.Entry(contact).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error in UpdateContactAsync: {ex.Message}");
                throw;
            }
        }

        public async Task DeleteContactAsync(int id)
        {
            try
            {
                var contact = await _context.Contacts.FindAsync(id);
                if (contact != null)
                {
                    _context.Contacts.Remove(contact);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error in DeleteContactAsync: {ex.Message}");
                throw;
            }
        }

        public async Task<List<Contact>> SearchContactsAsync(string searchTerm)
        {
            try
            {
                searchTerm = searchTerm.ToLower();
                var query = _context.Contacts.AsQueryable();

                query = query.Where(c =>
                    c.FirstName.ToLower().Contains(searchTerm) ||
                    c.LastName.ToLower().Contains(searchTerm) ||
                    c.Email.ToLower().Contains(searchTerm) ||
                    c.PhoneNumber.Contains(searchTerm));

                var results = await query.ToListAsync();
                return results;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Error in SearchContactsAsync: {ex.Message}");
                throw;
            }
        }
    }
}