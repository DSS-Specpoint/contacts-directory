import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Contact {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
}

interface ContactFormProps {
  contact: Contact | null;
  onSubmit: (contact: Contact) => void;
}

const ContactEdit: React.FC<ContactFormProps> = ({ contact, onSubmit }) => {
  const { id } = useParams<{ id: string }>();
  const [editedContact, setEditedContact] = useState<Contact | null>(contact); // Initialize with the passed contact

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`https://localhost:44305/api/Contact/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch contact');
        }
        const data = await response.json();
        setEditedContact(data); // Set the fetched contact data
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };
  
    if (!contact) {
      // If the contact prop is not provided initially, fetch contact data
      fetchContact();
    } else {
      // If the contact prop is provided, set it as editedContact
      setEditedContact(contact);
    }
  }, [contact, id]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!editedContact) return;
  console.log(editedContact)
      const response = await fetch(`https://localhost:44305/api/Contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(editedContact),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update contact');
      }
      else{
        alert("Contact updated successfuly!")
      }
  
      onSubmit(editedContact);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  };
  
  

  if (!editedContact) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={editedContact.FirstName}
          onChange={handleChange}
          placeholder="First Name"
          disabled={false}
        />
        <input
          type="text"
          name="lastName"
          value={editedContact.LastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={editedContact.Email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="tel"
          name="phone"
          value={editedContact.Phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="address"
          value={editedContact.Address}
          onChange={handleChange}
          placeholder="Address"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ContactEdit;
