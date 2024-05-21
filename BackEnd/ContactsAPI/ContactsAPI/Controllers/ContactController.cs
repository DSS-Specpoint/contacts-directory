using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Contact
        [HttpGet] // Route for retrieving all contacts
        public ActionResult<IEnumerable<Contact>> GetContacts()
        {
            var contactList = _context.Contacts.ToList();
            return contactList;
        }

        // GET: api/Contact/5
        [HttpGet("{id}")] // Route for retrieving a specific contact by ID
        public ActionResult<Contact> GetContact(int id)
        {
            var contact = _context.Contacts.Find(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        // POST: api/Contact
        [HttpPost] // Route for creating a new contact
        
        public ActionResult<Contact> PostContact(Contact contact)
        {
            _context.Contacts.Add(contact);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
        }

        // PUT: api/Contact/5
        [HttpPut("{id}")] // Route for updating an existing contact by ID
        public IActionResult PutContact(int id, Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            }

            _context.Entry(contact).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Contact/5
        [HttpDelete("{id}")] // Route for deleting a contact by ID
        public IActionResult DeleteContact(int id)
        {
            var contact = _context.Contacts.Find(id);

            if (contact == null)
            {
                return NotFound();
            }

            _context.Contacts.Remove(contact);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
