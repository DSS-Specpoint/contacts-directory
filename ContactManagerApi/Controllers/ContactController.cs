using Microsoft.AspNetCore.Mvc;
using ContactManagerApi.Services;
using ContactManagerApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        /// <summary>
        /// Api will Retrieves all contacts present.
        /// </summary>
        /// <returns>A list of contacts.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return Ok(await _contactService.GetContacts());
        }

        /// <summary>
        /// Api will Retrieves contact by ID.
        /// </summary>
        /// <param name="id">The ID of the contact.</param>
        /// <returns>The requested contact if found, otherwise 404.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _contactService.GetContactById(id);
            if (contact == null) return NotFound();
            return Ok(contact);
        }

        /// <summary>
        /// Api Creates a new contact.
        /// </summary>
        /// <param name="contact">The contact object to be created.</param>
        /// <returns>contact with its assigned ID.</returns>
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            await _contactService.AddContact(contact);
            return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
        }

        /// <summary>
        /// Api will Updates an existing contact.
        /// </summary>
        /// <param name="id">The ID of the contact to be updated.</param>
        /// <param name="contact">The updated contact object.</param>
        /// <returns>No content if successful, otherwise BadRequest if ID dont match.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.Id) return BadRequest();
            await _contactService.UpdateContact(contact);
            return NoContent();
        }

        /// <summary>
        /// Api will Deletes a contact by ID.
        /// </summary>
        /// <param name="id">The ID of the contact to be deleted..</param>
        /// <returns>Nothing will be returned when successful..</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            await _contactService.DeleteContact(id);
            return NoContent();
        }
    }
}
