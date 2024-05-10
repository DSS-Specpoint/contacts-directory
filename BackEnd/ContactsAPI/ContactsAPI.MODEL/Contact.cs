using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ContactsAPI.MODEL
{
    public class Contact
    {
        [Key]
        public int ContactId { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? FirstName { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string? LastName { get; set; }

        [Phone]
        [Column(TypeName = "varchar(12)")]
        public string? Phone { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string? Address { get; set; }

        [EmailAddress]
        [Column(TypeName = "varchar(100)")]
        public string? Email { get; set; }
    }
}
