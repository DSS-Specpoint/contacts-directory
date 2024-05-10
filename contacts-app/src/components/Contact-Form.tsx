import React from "react";
import { useForm, SubmitHandler } from "react-hook-form"; // Importing useForm and SubmitHandler hooks from react-hook-form
import { IContactType } from "../model/contact"; // Importing contact type interface
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation

interface Props {
  contact?: IContactType; // Optional contact object
  onSubmit: SubmitHandler<IContactType>; // onSubmit function with contact object as argument
}

export const ContactForm: React.FC<Props> = ({ contact, onSubmit }) => {
  // Destructuring useForm hook and extracting register, handleSubmit, and errors
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactType>({
    defaultValues: contact, // Setting default values to the form fields if contact object is provided
  });

  // Hook to enable navigation
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <input
          type="text"
          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} // Adding 'is-invalid' class if there are errors in firstName field
          id="firstName"
          {...register("firstName", { required: "First name is required", maxLength: 50 })} // Registering firstName field with validation rules
        />
        <div className="invalid-feedback">
          {errors.firstName && errors.firstName.message} {/* Displaying error message for firstName field */}
          {errors.firstName && errors.firstName.type === "maxLength" && (
            <span>Max length exceeded</span> // Displaying max length error message
          )}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} // Adding 'is-invalid' class if there are errors in lastName field
          id="lastName"
          {...register("lastName", { required: "Last name is required", maxLength: 50 })} // Registering lastName field with validation rules
        />
        <div className="invalid-feedback">
          {errors.lastName && errors.lastName.message} {/* Displaying error message for lastName field */}
          {errors.lastName && errors.lastName.type === "maxLength" && (
            <span>Max length exceeded</span> // Displaying max length error message
          )}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`} // Adding 'is-invalid' class if there are errors in email field
          id="email"
          {...register("email", { required: "Email is required", maxLength: 100 })} // Registering email field with validation rules
        />
        <div className="invalid-feedback">
          {errors.email && errors.email.message} {/* Displaying error message for email field */}
          {errors.email && errors.email.type === "maxLength" && (
            <span>Max length exceeded</span> // Displaying max length error message
          )}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone Number
        </label>
        <input
          type="tel"
          className={`form-control ${errors.phone ? 'is-invalid' : ''}`} // Adding 'is-invalid' class if there are errors in phone field
          id="phone"
          {...register("phone", { required: true, maxLength: 12, pattern: new RegExp('[0-9]') })} // Registering phone field with validation rules
        />
        <div className="invalid-feedback">
          {errors.phone && errors.phone.type === "required" && <span>Phone Number is required</span>}
          {errors.phone && errors.phone.type === "maxLength" && <span>Max length exceeded</span>}
          {errors.phone && errors.phone.type === "pattern" && <span>Phone Number should be numeric</span>}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          type="text"
          className={`form-control ${errors.address ? 'is-invalid' : ''}`} // Adding 'is-invalid' class if there are errors in address field
          id="address"
          {...register("address", { required: "Address is required", maxLength: 100 })} // Registering address field with validation rules
        />
        <div className="invalid-feedback">
          {errors.address && errors.address.message} {/* Displaying error message for address field */}
          {errors.address && errors.address.type === "maxLength" && (
            <span>Max length exceeded</span>
          )}
        </div>
      </div>
      
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <button
        type="button"
        className="btn btn-secondary ms-2"
        onClick={() => navigate("/")} // Navigating back to the home page on button click
      >
        Back
      </button>
    </form>
  );
};

