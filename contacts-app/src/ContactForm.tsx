import React, { useState, useEffect } from "react";

type Contact = {
  id?: number;
  name: string;
  email: string;
  phone: string;
};

type ContactFormProps = {
  contact?: Contact;
  onSave: (contact: Contact) => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ contact, onSave }) => {
  const [formData, setFormData] = useState<Contact>(contact || { id: 0, name: "", email: "", phone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ id: 0, name: "", email: "", phone: "" });
  };

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    } else {
      setFormData({ name: "", email: "", phone: "" });
    }
  }, [contact]);

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
      <button type="submit">{contact ? "Update" : "Add"} Contact</button>
    </form>
  );
};

export default ContactForm;
