using ContactsAPI.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
        Task<List<ContactDto>> GetAllContacts();
        Task<ContactDto> GetContactById(Guid id);
        Task<ContactDto> CreateContact(CreateContactRequestDto requestDto);
        Task<ContactDto> UpdateContact(Guid id, UpdateContactRequestDto requestDto);
        Task<ContactDto> DeleteContact(Guid id);
    }
}
