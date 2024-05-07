using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactsAPI.ENTITY
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
        [Column(TypeName = "varchar(50)")]
        public string? Phone { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string? Address { get; set; }

        [Column(TypeName = "varchar(500)")]  
        [StringLength(500)]
        public string? Comments { get; set; }

        [EmailAddress]
        [Column(TypeName = "varchar(100)")]
        public string? Email { get; set; }
    }
}
