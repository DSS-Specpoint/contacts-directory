import React, { useEffect, useState } from "react";
import { Contact } from "../types/Contact";
import '../App.css'; // Ensure the path is correct

interface ContactFormProps {
  contact?: Contact | null;
  onSubmit: (contact: Contact) => void;
  onCancel: () => void;
  loading: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [formData, setFormData] = useState<Contact>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    await onSubmit(formData);
    setFormData({ id: 0, firstName: "", lastName: "", email: "", phone: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="input-row">
        <div className="input-wrapper">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
      </div>

      {/* Email and Phone in the next row */}
      <div className="input-row">
        <div className="input-wrapper">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button 
        type="submit" 
        disabled={loading} 
        style={{ backgroundColor: '#3498db', color: 'white', width: '150px' }}>
        {contact ? "Update Contact" : "Create Contact"}
      </button>

      {contact && (
        <button type="button" onClick={onCancel} disabled={loading} className="cancel-button">
          Cancel
        </button>
      )}
      </div>
    </form>
  );
};

export default ContactForm;
