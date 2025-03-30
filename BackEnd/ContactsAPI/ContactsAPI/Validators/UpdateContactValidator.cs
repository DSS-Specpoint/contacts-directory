using ContactsAPI.Models.DTO;
using FluentValidation;
using System.Text.RegularExpressions;

namespace ContactsAPI.Validators
{
    public class UpdateContactValidator : AbstractValidator<UpdateContactRequestDto>
    {
        public UpdateContactValidator()
        {
            ClassLevelCascadeMode = CascadeMode.Stop;
            RuleFor(x => x.FirstName).NotEmpty().WithName("Frist Name").WithMessage("{PropertyName} is invalid");
            RuleFor(x => x.LastName).NotEmpty().WithName("Last Name").WithMessage("{PropertyName} is invalid");
            RuleFor(x => x.Email).EmailAddress().WithMessage("email is invalid");
            RuleFor(x => x.PhoneNumber).Must(phoneNumber =>
            {
                string regex = @"^[\d]{10}$";
                if (Regex.IsMatch(phoneNumber.ToString(), regex))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }).WithMessage("phone number is invalid");
        }
    }
}
