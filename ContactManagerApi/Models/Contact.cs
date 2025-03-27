//Some fields are added as required. Because they are neccessary.
namespace ContactManagerApi.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Phone { get; set; }
        public string? Address { get; set; }
        public string? Job { get; set; }
    }
}
