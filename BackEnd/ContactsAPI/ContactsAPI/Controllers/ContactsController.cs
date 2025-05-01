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
    public class ContactsController : Controller
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        // GET: api/contact
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var contacts = await _contactService.GetAllAsync();
                return Ok(new { data = contacts });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET: api/contact/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var contact = await _contactService.GetByIdAsync(id);
                if (contact == null)
                    return NotFound(new {message = $"Contact with Id {id} not found." });

                return Ok(new { data = contact });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST: api/contact
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ContactRequest contactRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdContactId = await _contactService.CreateAsync(contactRequest);
                return CreatedAtAction(nameof(GetById),
                new { id = createdContactId },
                new { message = "Contact Created Successfully", id = createdContactId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT: api/contact/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ContactRequest contactRequest)
        {
            try
            {
                var updated = await _contactService.UpdateAsync(id, contactRequest);
                if (!updated)
                    return NotFound(new { message = $"Contact with Id {id} not found." });

                return Ok(new { message = $"Contact with Id {id} updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE: api/contact/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deleted = await _contactService.DeleteAsync(id);
                if (!deleted)
                    return NotFound(new { message = $"Contact with Id {id} not found." });

                return Ok(new { message = $"Contact with Id {id} deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
