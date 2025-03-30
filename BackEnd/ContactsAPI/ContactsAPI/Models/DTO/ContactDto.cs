using System;

namespace ContactsAPI.Models.DTO
{
    public class ContactDto
    {
        public Guid Id { get; set; } // Primary Key
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public long PhoneNumber { get; set; }
    }
}
