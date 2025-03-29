using AutoMapper;
using ContactsAPI.Models;
using ContactsAPI.Models.DTO;

namespace ContactsAPI.Mappings
{
    public class ContactProfile : Profile
    {
        public ContactProfile()
        {
            CreateMap<Contact, ContactDto>().ReverseMap();
            CreateMap<Contact, CreateContactRequestDto>().ReverseMap();
            CreateMap<Contact, UpdateContactRequestDto>().ReverseMap();
        }
    }
}
