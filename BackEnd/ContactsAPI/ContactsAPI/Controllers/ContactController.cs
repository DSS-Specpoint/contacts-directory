using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Models.DTO;
using ContactsAPI.Services;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly IContactService contactService;
        private readonly IValidator<CreateContactRequestDto> createValidator;
        private readonly IValidator<UpdateContactRequestDto> updateValidator;

        public ContactController(IContactService contactService, 
            IValidator<CreateContactRequestDto> createValidator,
            IValidator<UpdateContactRequestDto> updateValidator
            )
        {
            this.contactService = contactService;
            this.createValidator = createValidator;
            this.updateValidator = updateValidator;
        }
        // GET: api/<controller>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<ContactDto> contactDtos = await contactService.GetAllContacts();
            return Ok(contactDtos);
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            ContactDto contactDto = await contactService.GetContactById(id);
            return Ok(contactDto);  
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateContactRequestDto requestModel)
        {
            var ValidationResult = await createValidator.ValidateAsync(requestModel); // validating request dto model
            if (ValidationResult.IsValid)
            {
                ContactDto createdContactDto = await contactService.CreateContact(requestModel);
                return CreatedAtAction(nameof(GetById), new { id = createdContactDto.Id }, createdContactDto);
            }
            else
            {
                string errorMessage = string.Empty;
                foreach(var validationFailure in ValidationResult.Errors)
                {
                    errorMessage += validationFailure.ErrorMessage;
                }
                return BadRequest(errorMessage);
            }
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] Guid id, [FromBody]UpdateContactRequestDto requestModel)
        {
            var ValidationResult = await updateValidator.ValidateAsync(requestModel); // validating request dto model
            if (ValidationResult.IsValid)
            {
                ContactDto updatedContactDto = await contactService.UpdateContact(id, requestModel);
                if (updatedContactDto != null)
                {
                    return Ok(updatedContactDto);
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                string errorMessage = string.Empty;
                foreach (var validationFailure in ValidationResult.Errors)
                {
                    errorMessage += validationFailure.ErrorMessage;
                }
                return BadRequest(errorMessage);
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            ContactDto deletedContactDto = await contactService.DeleteContact(id);
            if(deletedContactDto != null)
            {
                return Ok(deletedContactDto);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
