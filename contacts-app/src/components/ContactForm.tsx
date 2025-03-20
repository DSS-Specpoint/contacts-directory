import React, { useState, useEffect } from "react";
import { Contact } from "../types/Contact";

interface ContactFormProps {
  contact?: Contact | null;
  onSubmit: (contact: Contact) => Promise<void>;
  onCancel: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Contact>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    console.log("ContactForm received contact:", contact);
    if (contact) {
      setFormData(contact);
    } else {
      setFormData({ id: 0, firstName: "", lastName: "", email: "", phone: "" });
    }
  }, [contact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <button type="submit">
        {contact ? "Update Contact" : "Create Contact"}
      </button>
      {contact && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ContactForm;
