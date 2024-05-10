using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Models;
using ContactsAPI.Services;
using Humanizer.Localisation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        private static List<Contact> contacts = new List<Contact>
        {
            new Contact { Id = 1, Name = "Pratiksha Kadam", Email = "Pratiksha@outlook.com", Phone = "1234567890" },
            new Contact { Id = 2, Name = "Nick adam", Email = "Nick@outlook.com", Phone = "4584673812" },
            new Contact { Id = 3, Name = "Deep adil", Email = "Deep@outlook.com", Phone = "4579345234" },
            new Contact { Id = 4, Name = "Prakash mane", Email = "prakash@outlook.com", Phone = "7632450987" },
            new Contact { Id = 5, Name = "Mansi rane", Email = "mansi@outlook.com", Phone = "9845643247" },
            new Contact { Id = 6, Name = "Mansi rane", Email = "mansi@outlook.com", Phone = "9845643247" },
            new Contact { Id = 7, Name = "Bulbul rane", Email = "Bulbul@outlook.com", Phone = "7634578376" },
            new Contact { Id = 8, Name = "Rani Mukharji", Email = "Rani@outlook.com", Phone = "7635489879" },
            new Contact { Id = 9, Name = "Mahi kulandri", Email = "mahi@outlook.com", Phone = "7654876543" },
            new Contact { Id = 10, Name = "Jay Nikam", Email = "jay@outlook.com", Phone = "654327896" }
        };

        /// <summary>
        /// Gets a contact collection <seealso cref="Contact"/>/>.
        /// </summary>
        [HttpGet("/contacts", Name = "GetContacts")]
        public IActionResult GetContact()
        {
            var contacts = _contactService.GetAllContacts();
            return Ok(contacts);
        }

        /// <summary>
        /// Gets a contact by Id.
        /// </summary>
        /// <param name="id">contact Id.</param>
        [HttpGet("/contacts/{id}", Name = "GetContactById")]
        public IActionResult GetContactById(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var contact = _contactService.GetContactById(id);

            if (contact == null)
            {
                return NotFound();
            }
            
            return Ok(contact);
        }

        /// <summary>
        /// Creates a new contact.
        /// </summary>
        /// <param name="contact">A <see cref="Contact"/>.</param>
        [HttpPost("/contacts", Name = "CreateContact")]
        public IActionResult AddContact(Contact contact)
        {
            // Check the model state
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Generate new Id
            _contactService.AddContact(contact);

            return new ObjectResult(contact) { StatusCode = StatusCodes.Status201Created };
        }

        /// <summary>
        /// Updates an existing Contact.
        /// </summary>
        /// <param name="id">contact Id.</param>
        /// <param name="updatedcontact"> <see cref="Contact"/>.</param>
        [HttpPut("/contacts/{id}", Name = "UpdateContacts")]
        public IActionResult UpdateContact(int id, Contact updatedContact)
        {
            if(id != updatedContact.Id)
            {
                return ValidationProblem($"Contact Id ({id}) is not matching with payload Id");
            }

            // If model data is invalid
            if (!ModelState.IsValid)
            {
                return ValidationProblem();
            }

            var existingContact = _contactService.GetContactById(id);
            if (existingContact == null)
            {
                return NotFound();
            }

            // Update the contact fields
            existingContact.Name = updatedContact.Name;
            existingContact.Email = updatedContact.Email;
            existingContact.Phone = updatedContact.Phone;

            _contactService.UpdateContact(existingContact);

            return Ok(existingContact);
        }

        /// <summary>
        /// Delete the Existing Contact.
        /// </summary>
        /// <param name="id"></param>
        [HttpDelete("/contacts/{id}", Name = "DeleteContact")]
        public IActionResult Delete(int id)
        {
            var existingContact = _contactService.GetContactById(id);
            if (existingContact == null)
            {
                return NotFound();
            }

            _contactService.DeleteContact(id);

            return NoContent();

        }
    }
}

