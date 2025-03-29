import { useForm } from "Hooks/useForm";
import { Contact } from "Models/Contact";
import { UpdateCreateContact } from "Models/UpdateCreateContact";
import React from "react";

const Form = (props: {
  contact: Contact;
  type: string;
  onSubmit: (contact: UpdateCreateContact) => void;
}) => {
  const { contact, type } = props;
  const { formState, inputHandler } = useForm(
    {
      firstName: { value: contact.firstName, isValid: type === "Update" },
      lastName: { value: contact.lastName, isValid: type === "Update" },
      email: { value: contact.email, isValid: type === "Update" },
      phoneNumber: { value: contact.phoneNumber, isValid: type === "Update" },
    },
    type === "Update"
  );

  const { firstName, lastName, email, phoneNumber } = formState.inputs;

  const { isValid: isFormValid } = formState;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let isValid = false;
    let { name, value } = e.target;
    switch (name) {
      case "firstName":
      case "lastName":
        if (/^[a-zA-Z]+$/.test(value)) {
          isValid = true;
        }
        break;
      case "email":
        if (/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/.test(value)) {
          isValid = true;
        }
        break;
      case "phoneNumber":
        if (/^[\d]{10}$/.test(value)) {
          isValid = true;
        }
        break;
    }
    inputHandler(name, value, isValid);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedContact: UpdateCreateContact = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
    };
    props.onSubmit(updatedContact);
  };

  return (
    <form className="container mt-4 p-4 border rounded shadow-sm">
      <div className="mb-3 row">
        <div className="col mb-1">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
        </div>
        <div className="col">
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={firstName.value}
            onChange={handleOnChange}
            minLength={1}
            required
          />
        </div>
        {!firstName.isValid && (
          <div className="col">
            <p style={{color:"red"}}>Please enter valid first name.</p>
          </div>
        )}
      </div>
      <div className="mb-3 row">
        <div className="col mb-1">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
        </div>
        <div className="col">
          <input
            type="text"
            name="lastName"
            minLength={1}
            value={lastName.value}
            onChange={handleOnChange}
            className="form-control"
            required
          />
        </div>
        {!lastName.isValid && (
          <div className="col">
            <p style={{color:"red"}}>Please enter valid last name.</p>
          </div>
        )}
      </div>
      <div className="mb-3 row">
        <div className="col mb-1">
          <label htmlFor="email" className="form-label">
            Email
          </label>
        </div>
        <div className="col">
          <input
            type="email"
            name="email"
            value={email.value}
            onChange={handleOnChange}
            className="form-control"
            required
          />
        </div>
        {!email.isValid && (
          <div className="col">
            <p style={{color:"red"}}>Please enter valid email.</p>
          </div>
        )}
      </div>
      <div className="mb-3 row">
        <div className="col mb-1">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
        </div>
        <div className="col">
          <input
            type="number"
            name="phoneNumber"
            value={phoneNumber.value}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>
        {!phoneNumber.isValid && (
          <div className="col">
            <p style={{color:"red"}}>Please enter valid phone Number.</p>
          </div>
        )}
      </div>
      <div className="row">
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          {type}
        </button>
      </div>
    </form>
  );
};

export default Form;
