using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.BAL.Interface;
using ContactsAPI.ENTITY;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{

    //[ApiController]
    //[Route("[controller]")]
    //public class ContactsController : ControllerBase
    //{
    //    private readonly IContactService _contactService;

    //    public ContactsController(IContactService contactService)
    //    {
    //        _contactService = contactService;
    //    }

    //    [HttpGet]
    //    public async Task<ActionResult<IEnumerable<Contact>>> Get()
    //    {
    //        return Ok(await _contactService.GetAllContacts());
    //    }

    //    [HttpGet("{id}")]
    //    public async Task<ActionResult<Contact>> Get(int id)
    //    {
    //        var contact = await _contactService.GetContactById(id);
    //        if (contact == null) return NotFound();
    //        return contact;
    //    }

    //    [HttpPost]
    //    public async Task<ActionResult<Contact>> Post([FromBody] Contact contact)
    //    {
    //        var createdContact = await _contactService.CreateContact(contact);
    //        return CreatedAtAction(nameof(Get), new { id = createdContact.CotactId }, createdContact);
    //    }

    //    [HttpPut("{id}")]
    //    public async Task<IActionResult> Put(int id, [FromBody] Contact contact)
    //    {
    //        if (id != contact.CotactId) return BadRequest();
    //        await _contactService.UpdateContact(contact);
    //        return NoContent();
    //    }

    //    [HttpDelete("{id}")]
    //    public async Task<IActionResult> Delete(int id)
    //    {
    //        await _contactService.DeleteContactById(id);
    //        return NoContent();
    //    }
    //}

    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<Contact>>>> Get()
        {
            var contacts = await _contactService.GetAllContacts();
            return Ok(new ApiResponse<IEnumerable<Contact>>(contacts));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Contact>>> Get(int id)
        {
            var contact = await _contactService.GetContactById(id);
            if (contact == null)
                return NotFound(new ApiResponse<Contact>("Contact not found"));

            return Ok(new ApiResponse<Contact>(contact));
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<Contact>>> Post([FromBody] Contact contact)
        {
            var createdContact = await _contactService.CreateContact(contact);
            return CreatedAtAction(nameof(Get), new { id = createdContact.ContactId }, new ApiResponse<Contact>(createdContact, "Contact created successfully"));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Contact contact)
        {
            if (id != contact.ContactId)
                return BadRequest(new ApiResponse<Contact>("Mismatched Contact ID"));

            await _contactService.UpdateContact(contact);
            return NoContent();
        }

     
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _contactService.DeleteContactById(id);
            if (!result)
                return NotFound(new ApiResponse<string>("Contact not found to delete", null));

            return NoContent();
        }

    }


}
