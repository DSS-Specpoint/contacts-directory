using System.Collections.Generic;
using System.Threading.Tasks;
using ContactsAPI.BAL.Interface;
using ContactsAPI.MODEL;
using Microsoft.AspNetCore.Mvc;

namespace ContactsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly IContactInterface _contact;

        // Constructor to inject dependency of IContactInterface
        public ContactController(IContactInterface contact)
        {
            _contact = contact;
        }

        // GET: api/Contact
        [HttpGet]
        // Action method to get all contacts
        public async Task<ActionResult<ContactsAPIResponse<IEnumerable<Contact>>>> GetAllContact()
        {
            var contacts = await _contact.GetAllContacts();
            return Ok(new ContactsAPIResponse<IEnumerable<Contact>>(contacts));
        }

        // GET: api/Contact/id
        [HttpGet("{id}")]
        // Action method to get contact details by ID
        public async Task<ActionResult<ContactsAPIResponse<Contact>>> GetContactDetails(int id)
        {
            var contact = await _contact.GetContactById(id);
            if (contact == null)
                return NotFound(new ContactsAPIResponse<Contact>("Contact not found"));

            return Ok(new ContactsAPIResponse<Contact>(contact));
        }

        // POST: api/Contact
        [HttpPost]
        // Action method to create a new contact
        public async Task<ActionResult<ContactsAPIResponse<Contact>>> CreateContact([FromBody] Contact contact)
        {
            contact.ContactId = 0; // Set ContactId to 0 to ensure a new contact is created
            var createdContact = await _contact.CreateContact(contact);
            return CreatedAtAction(nameof(GetContactDetails), new { id = createdContact.ContactId }, new ContactsAPIResponse<Contact>(createdContact, "Contact created successfully"));
        }

        // PUT: api/Contact/id
        [HttpPut("{id}")]
        // Action method to update an existing contact
        public async Task<IActionResult> UpdateContact(int id, [FromBody] Contact contact)
        {
            if (id != contact.ContactId)
                return BadRequest(new ContactsAPIResponse<Contact>("Mismatched Contact ID"));

            await _contact.UpdateContact(contact);
            return NoContent();
        }

        // DELETE: api/Contact/id
        [HttpDelete("{id}")]
        // Action method to delete a contact by ID
        public async Task<IActionResult> DeleteContact(int id)
        {
            var result = await _contact.DeleteContactById(id);
            if (!result)
                return NotFound(new ContactsAPIResponse<string>("Contact not found to delete", null));

            return NoContent();
        }
    }
}
