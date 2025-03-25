using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Models;
using ContactsAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _service;
        public ContactController(IContactService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllContactsAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var contact = await _service.GetContactByIdAsync(id);
            return contact != null ? Ok(contact) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Contact contact)
        {
            var createdContact = await _service.CreateContactAsync(contact);
            return CreatedAtAction(nameof(GetById), new { id = createdContact.Id }, createdContact);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Contact contact)
        {
            if (id != contact.Id) return BadRequest();
            return await _service.UpdateContactAsync(contact) ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) => await _service.DeleteContactAsync(id) ? NoContent() : NotFound();
    }

}
