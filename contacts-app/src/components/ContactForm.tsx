// src/components/ContactForm.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IContactType } from "../types/Contact";
import { useNavigate } from "react-router-dom";

interface Props {
  contact?: IContactType;
  onSubmit: SubmitHandler<IContactType>;
}

export const ContactForm: React.FC<Props> = ({ contact, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IContactType>({
    defaultValues: contact
  });

  const Usenavigator = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input type="text" className="form-control" id="firstName" {...register("firstName", { required: "First name is required" })} />
        {errors.firstName && <div className="text-danger">{errors.firstName.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="last_name" className="form-label">Last Name</label>
        <input type="text" className="form-control" id="last_name" {...register("lastName", { required: "Last name is required" })} />
        {errors.lastName && <div className="text-danger">{errors.lastName.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" {...register("email", { required: "Email is required" })} />
        {errors.email && <div className="text-danger">{errors.email.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone (optional)</label>
        <input type="text" className="form-control" id="phone" {...register("phone")} />
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input type="text" className="form-control" id="address" {...register("address", { required: "Address is required" })} />
        {errors.address && <div className="text-danger">{errors.address.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="comments" className="form-label">Comments</label>
        <textarea className="form-control" id="comments" {...register("comments")} />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
      <button type="button" className="btn btn-secondary" onClick={()=>Usenavigator("/")} style={{ marginLeft: '5px' }}>Back</button>

    </form>
  );
  
};
