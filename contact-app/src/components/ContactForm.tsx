import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config";

interface Contact {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  job: string;
}

interface ContactFormProps {
  onSave: () => void;
  editingContact?: Contact | null;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSave, editingContact }) => {
  const [formData, setFormData] = useState<Contact>({
    name: "",
    email: "",
    phone: "",
    address: "",
    job: "",
  });

  useEffect(() => {
    if (editingContact) {
      setFormData(editingContact);
    }
  }, [editingContact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingContact) {
        await fetch(`${API_BASE_URL}/contacts/${editingContact.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch(`${API_BASE_URL}/contacts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setFormData({ name: "", email: "", phone: "", address: "", job: "" });
      onSave();  //Refresh list after saving
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
      <input type="text" name="job" value={formData.job} onChange={handleChange} placeholder="Job" />
      <button type="submit">{editingContact ? "Update" : "Add"} Contact</button>
    </form>
  );
};

export default ContactForm;
