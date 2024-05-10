using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Models
{
    /// <summary>
    /// Contact class for storing the contact of the user 
    /// </summary>
    public class Contact
    {
        /// <summary>
        /// Unique identifier for contact 
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Name of the contact person
        /// </summary>
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// Email id detail of the contact
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        /// <summary>
        /// Phone number of the contact
        /// </summary>
        [Required]
        [Phone]
        public string Phone { get; set; }
    }
}
