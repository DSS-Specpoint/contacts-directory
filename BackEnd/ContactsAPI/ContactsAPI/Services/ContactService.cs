using ContactsAPI.Data;
using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;

        public ContactService(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public async Task<IEnumerable<ContactResponse>> GetAllAsync()
        {
            try
            {
                var contacts = await _contactRepository.GetAllAsync();

                return contacts.Select(c => new ContactResponse
                {
                    Id = c.Id,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    Email = c.Email,
                    PhoneNumber = c.PhoneNumber
                }).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve contacts.", ex);
            }
        }

        public async Task<ContactResponse?> GetByIdAsync(int id)
        {
            try
            {
                var contact = await _contactRepository.GetByIdAsync(id);
                if (contact == null) return null;

                return new ContactResponse
                {
                    Id = contact.Id,
                    FirstName = contact.FirstName,
                    LastName = contact.LastName,
                    Email = contact.Email,
                    PhoneNumber = contact.PhoneNumber
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to retrieve contact with ID {id}.", ex);
            }
        }

        public async Task<int> CreateAsync(ContactRequest request)
        {
            try
            {
                var contact = new Contact
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    PhoneNumber = request.PhoneNumber
                };

                return await _contactRepository.CreateAsync(contact);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create contact.", ex);
            }
        }

        public async Task<bool> UpdateAsync(int id, ContactRequest request)
        {
            try
            {
                var contact = new Contact
                {
                    Id = id,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    PhoneNumber = request.PhoneNumber
                };

                return await _contactRepository.UpdateAsync(id, contact);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update contact.", ex);
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                return await _contactRepository.DeleteAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to delete contact with ID {id}.", ex);
            }
        }
    }
}
