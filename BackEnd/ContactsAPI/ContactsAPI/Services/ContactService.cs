using AutoMapper;
using ContactsAPI.Models;
using ContactsAPI.Models.DTO;
using ContactsAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository contactRepository;
        private readonly IMapper mapper;

        public ContactService(IContactRepository contactRepository, IMapper mapper)
        {
            this.contactRepository = contactRepository; // injecting contact repository for db transactions
            this.mapper = mapper;
        }

        public async Task<ContactDto> CreateContact(CreateContactRequestDto requestDto)
        {
            Contact contact = mapper.Map<Contact>(requestDto);
            Contact createdContactDomainModel = await contactRepository.CreateContactAsync(contact);
            ContactDto contactDto = mapper.Map<ContactDto>(createdContactDomainModel);
            return contactDto;
        }

        public async Task<ContactDto> DeleteContact(Guid id)
        {
            Contact deletedContactDomainModel = await contactRepository.DeleteContactAsync(id);
            if(deletedContactDomainModel != null)
            {
                ContactDto contactDto = mapper.Map<ContactDto>(deletedContactDomainModel);
                return contactDto;
            }
            else
            {
                return null;
            }
        }

        public async Task<List<ContactDto>> GetAllContacts()
        {
            List<Contact> contactDomainList = await contactRepository.GetAllContactsAsync();
            List<ContactDto> contactDtos = mapper.Map<List<ContactDto>>(contactDomainList);
            return contactDtos;
        }

        public async Task<ContactDto> GetContactById(Guid id)
        {
            Contact contactDomainModel = await contactRepository.GetContactByIdAsync(id);
            ContactDto contactDto = mapper.Map<ContactDto>(contactDomainModel);
            return contactDto;
        }

        public async Task<ContactDto> UpdateContact(Guid id, UpdateContactRequestDto requestDto)
        {
            Contact contact = mapper.Map<Contact>(requestDto);
            Contact updatedContactDomainModel = await contactRepository.UpdateContactAsync(id, contact);
            if(updatedContactDomainModel != null)
            {
                ContactDto contactDto = mapper.Map<ContactDto>(updatedContactDomainModel);
                return contactDto;
            }
            else
            {
                return null;
            }
        }
    }
}
