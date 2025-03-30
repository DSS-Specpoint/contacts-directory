using System.ComponentModel.DataAnnotations;

namespace ContactsAPI.Models.DTO
{
    public class CreateContactRequestDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public long PhoneNumber { get; set; }
    }
}
